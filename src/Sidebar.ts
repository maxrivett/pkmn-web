import Phaser from 'phaser';

export default class Sidebar extends Phaser.GameObjects.Container {
    private background: Phaser.GameObjects.Rectangle;
    private text: Phaser.GameObjects.Text;
    private buttons: Phaser.GameObjects.Text[];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.background = scene.add.rectangle(0, 0, scene.cameras.main.width / 4, scene.cameras.main.height, 0x000000, 0.5);
        this.text = scene.add.text(0, 0, 'Sidebar', { color: '#ffffff' });

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
            const button = scene.add.text(10, 50 * (index + 1), data.label, { font: '16px Arial', color: '#ffffff' });
            button.setInteractive();
            button.on('pointerdown', () => {
                data.callback.call(this);
            });
            this.buttons.push(button);
            this.add(button);
        });

        this.add(this.background);
        this.add(this.text);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.background.width, this.background.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const localX = pointer.x - this.x;
            const localY = pointer.y - this.y;

            this.buttons.forEach(button => {
                if (button.getBounds().contains(localX, localY)) {
                    button.emit('pointerdown', pointer);
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
        console.log('Save button clicked');
    }
}