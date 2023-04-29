import Phaser from 'phaser';
import Player from './Player';

export default class GameScene extends Phaser.Scene {
    private player?: Player;

    constructor() {
        super({ key: 'GameScene' });
        console.log('constructed')
    }

    preload() {
        // Preload assets here
        this.load.image('player', 'assets/sprites/player.png');
    }

    create() {
        console.log('creating player...')
        // Create game entities here
        this.player = new Player(this, 400, 300); // create a new Player entity at the center of the screen
    }

    update() {
        // Update game entities here
        if (this.player) {
            this.player.update();
        }
    }
}