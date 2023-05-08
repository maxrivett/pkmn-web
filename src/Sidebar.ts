import Phaser from 'phaser';
import PlayerData from './PlayerData';
import Player from './Player';
import Pokemon from './scenes/Pokemon';

const FONT = 'PokemonPixel';

export default class Sidebar extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle;
    private buttons: Phaser.GameObjects.Text[];
    private playerData: PlayerData;
    private player: Player; 
    private selectedButtonIndex: number = 0;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private actionKey: Phaser.Input.Keyboard.Key;
  
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
            { label: `${this.playerData.getName()}`, callback: this.playerCard },
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

            button.setInteractive()
                .on('pointerover', () => {
                    button.setStyle({ color: '#ff0000' }); // Change color on hover
                })
                .on('pointerout', () => {
                    button.setStyle({ color: '#000000' }); // Change color back on mouse out
                });
            if (index === 0) {
                button.setStyle({ color: '#ff0000' });
            }

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
                    button.setStyle({ color: '#00ff00' }); // Change color on click
                    buttonData[index].callback.call(this);
                    button.setStyle({ color: '#000000' }); // Change color back on mouse release
                }
            });
        });

        scene.add.existing(this);
        this.setScrollFactor(0); // This ensures that the sidebar doesn't move with camera scroll
        this.setDepth(50); // Set a high depth value to render the sidebar above everything else
        this.setVisible(!this.visible); // make invisible to start

        // Add keyboard input listeners
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.actionKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.scene.input.keyboard.on('keydown', (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            this.navigateButtons(event.key === 'ArrowUp' ? 'up' : 'down');
        }
        });

        this.actionKey.on('down', () => {
        this.activateButton();
        });
    }

    navigateButtons(direction: 'up' | 'down') {
        // Deselect the current button
        this.buttons[this.selectedButtonIndex].setStyle({ color: '#000000' });
    
        // Update the selected button index
        if (direction === 'up') {
          this.selectedButtonIndex = (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
        } else {
          this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
        }
    
        // Select the new button
        this.buttons[this.selectedButtonIndex].setStyle({ color: '#ff0000' });
      }
    
      activateButton() {
        // Call the button's callback function
        const buttonData = [
          { label: 'Pokemon', callback: this.openPokemon },
          { label: `${this.playerData.getName()}`, callback: this.playerCard },
          { label: 'Bag', callback: this.openBag },
          { label: 'Settings', callback: this.openSettings },
          { label: 'Save', callback: this.saveGame },
        ];
        buttonData[this.selectedButtonIndex].callback.call(this);
      }

  openPokemon() {
    console.log('Pokemon button clicked');
    // this.visible = false;

    // Check if the Pokemon scene is already added
    const isAdded = this.scene.scene.get('Pokemon') !== null;

    if (!isAdded) {
        // Add the Pokemon scene to the Scene Manager if it's not already added
        this.scene.scene.add('Pokemon', new Pokemon(this.playerData), false);
    }

    // Launch the Pokemon scene
    this.scene.scene.launch('Pokemon');
  }

  playerCard() {
    console.log('Player clicked');
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
    this.playerData.setPokemon(['Charmander', 'Bulbasaur']);
    this.playerData.saveData(); // Save the player data to localStorage
    console.log('Game saved:', this.playerData);
  }
}