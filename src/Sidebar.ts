import Phaser from 'phaser';
import PlayerData from './PlayerData';
import Player from './Player';

const FONT = 'PokemonPixel';

export default class Sidebar extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle;
    private buttons: Phaser.GameObjects.Text[];
    private playerData: PlayerData;
    private player: Player; 
  
    constructor(scene: Phaser.Scene, x: number, y: number, playerData: PlayerData, player: Player) {
      super(scene, x, y);
  
      this.playerData = playerData;
      this.player = player;

        this.background = scene.add.rectangle(
        0,
        0,
        scene.cameras.main.width / 2,
        scene.cameras.main.height * 2,
        0xffffff,
        1
        );

        // Add the background first
        this.add(this.background);

        // Initialize the array of buttons
        this.buttons = [];

        // Define the labels and callback functions for the buttons
        const buttonData = [
        { label: 'Pokemon', callback: this.openPokemon },
        { label: 'Bag', callback: this.openBag },
        { label: 'Settings', callback: this.openSettings },
        { label: 'Save', callback: this.saveGame },
        ];

        // Create the buttons
        buttonData.forEach((data, index) => {
        const button = scene.add.text(10, 60 * (index), data.label, {
            fontFamily: FONT,
            fontSize: 50,
            color: '#000000',
        });

        this.add(button);
        this.buttons.push(button);
        });

        this.setInteractive(
        new Phaser.Geom.Rectangle(
            0,
            0,
            this.background.width,
            this.background.height
        ),
        Phaser.Geom.Rectangle.Contains
        );

        this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        const localX = pointer.x - this.x;
        const localY = pointer.y - this.y;

        this.buttons.forEach((button, index) => {
            if (button.getBounds().contains(localX, localY)) {
            buttonData[index].callback.call(this);
            }
        });
        });

        scene.add.existing(this);
        this.setScrollFactor(0); // This ensures that the sidebar doesn't move with camera scroll
        this.setDepth(50); // Set a high depth value to render the sidebar above everything else
        this.setVisible(!this.visible); // make invisible to start
    }

  openPokemon() {
    console.log('Pokemon button clicked');
  }

  openBag() {
    console.log('Bag button clicked');
  }

  openSettings() {
    console.log('Settings button clicked');
  }

  saveGame() {
    const currentPlayerScene = this.scene.scene.key;
    const playerPosition = {
      x: this.player.x,
      y: this.player.y,
    };
    this.playerData.setCurrentScene(currentPlayerScene);
    this.playerData.setPosition(this.player.x, this.player.y);
    this.playerData.setActive(false);
    this.playerData.setDirectionInteger(this.player.getDirection());
    this.playerData.saveData(); // Save the player data to localStorage
    console.log('Game saved:', this.playerData);
  }
}