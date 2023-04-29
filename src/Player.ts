import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        console.log('player created')

        // Add this entity to the scene's physics
        this.scene.physics.world.enable(this);
        // Add this entity to the scene's update list
        this.scene.add.existing(this);

        // Initialize the cursor keys
        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        // Handle player input and movement here
        if (this.cursorKeys.up?.isDown) {
            this.setVelocityY(-100);
        } else if (this.cursorKeys.down?.isDown) {
            this.setVelocityY(100);
        } else {
            this.setVelocityY(0);
        }

        if (this.cursorKeys.left?.isDown) {
            this.setVelocityX(-100);
        } else if (this.cursorKeys.right?.isDown) {
            this.setVelocityX(100);
        } else {
            this.setVelocityX(0);
        }
    }
}