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
        this.load.image('tileset', 'assets/tileset.png'); //tileset
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');
        this.load.image('player', 'assets/sprites/player.png');
    }

    create() {
        console.log('creating player...')
        // Create game entities here
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('tileset');
        console.log(map);
        console.log(tileset);
        const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2', tileset, 0, 0);

        // for collisions
        layer1.setCollisionByProperty({ collides: false });
        layer2.setCollisionByProperty({ collides: true });
        

        this.player = new Player(this, 400, 300); // create a new Player entity at the center of the screen

        // for collisions
        this.physics.add.collider(this.player, layer2);

        // Camera to follow player around
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); 
        // this.cameras.main.centerOn(800, 1300);
    }

    update() {
        // Update game entities here
        if (this.player) {
            this.player.update();
        }
    }
}