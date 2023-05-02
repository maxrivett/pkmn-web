import Phaser from 'phaser';

const TILE_WIDTH = 16;
const VELOCITY_EPSILON = 1e-2; // velocity close to zero
export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private target: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        // Add this entity to the scene's physics
        this.scene.physics.world.enable(this);
        // Add this entity to the scene's update list
        this.scene.add.existing(this);
        scene.physics.add.existing(this);

        // Initialize the cursor keys
        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();

        // Initialize the target
        this.target = new Phaser.Math.Vector2(this.x, this.y);
    }

    update() {
        // If the player isn't moving and should be, reset target (so that doesn't get stuck to objects)
        if (Math.abs(this.body.velocity.x) <= VELOCITY_EPSILON &&
            Math.abs(this.body.velocity.y) <= VELOCITY_EPSILON &&
            (this.x !== this.target.x || this.y !== this.target.y)) {
            this.target.x = this.x;
            this.target.y = this.y;
        }

        // Check for input and update target if necessary
        // TODO: Do not allow diagonal movement
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            if (this.cursorKeys.up?.isDown) {
                this.target.y -= TILE_WIDTH;
            } else if (this.cursorKeys.down?.isDown) {
                this.target.y += TILE_WIDTH;
            }

            if (this.cursorKeys.left?.isDown) {
                this.target.x -= TILE_WIDTH;
            } else if (this.cursorKeys.right?.isDown) {
                this.target.x += TILE_WIDTH;
            }
        }

        // Move towards target
        this.scene.physics.moveTo(this, this.target.x, this.target.y, 100);

        // If close enough to target, snap position to target
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            this.setPosition(this.target.x, this.target.y);
            this.body.reset(this.target.x, this.target.y);
        }
    }
}