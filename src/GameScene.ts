import Phaser from 'phaser';
import Player from './Player';

const TILE_WIDTH = 16;

export default class GameScene extends Phaser.Scene {
    private player?: Player;
    

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Preload assets here
        this.load.image('player', 'assets/sprites/player.png');

        this.load.image("tiles", "assets/tiles/tileset.png");
        this.load.tilemapTiledJSON("map", "assets/tiles/tilemap.json");

    }

    create() {
        // Create game entities here

        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tileset", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createLayer("World", tileset, 0, 0);
        const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

        // for collisions
        worldLayer.setCollisionBetween(1, 21000, true);
        // worldLayer.setCollisionByProperty({ collides: true });
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });        

        this.player = new Player(this, TILE_WIDTH, 24); // create a new Player entity at the center of the screen
        
        aboveLayer.setDepth(10) // make sure above player

        // enable physics for the player sprite
        this.physics.add.existing(this.player);

        // for collisions
        this.physics.add.collider(this.player, worldLayer);

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