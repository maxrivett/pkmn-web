import Phaser from 'phaser';
import Player from './Player';

const TILE_WIDTH = 32;
const PLAYER_SPRITE = "guy" // change later
const ZONE = "zone1"; // player location for tilemap

export default class GameScene extends Phaser.Scene {
    private player?: Player;
    

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Preload assets here
        // this.load.image('player', 'assets/sprites/player.png');
        this.load.image("tiles", "../assets/tiles/tileset.png");
        this.load.tilemapTiledJSON("map", `../assets/tiles/${ZONE}/tilemap.json`);

        // Sprite sheet
        this.load.spritesheet('player', `../assets/sprites/player/${PLAYER_SPRITE}sheet.png`, { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // Sprite animations
        this.anims.create({
            key: 'up',
            frames: [
                { key: 'player', frame: 0 },
                { key: 'player', frame: 10 },
                { key: 'player', frame: 0 },
                { key: 'player', frame: 2 },
            ],
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'right',
            frames: [
                { key: 'player', frame: 1 },
                { key: 'player', frame: 4 },
                { key: 'player', frame: 1 },
                { key: 'player', frame: 7 },
            ],
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'down',
            frames: [
                { key: 'player', frame: 5 },
                { key: 'player', frame: 8 },
                { key: 'player', frame: 5 },
                { key: 'player', frame: 11 },
            ],
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'left',
            frames: [
                { key: 'player', frame: 6 },
                { key: 'player', frame: 3 },
                { key: 'player', frame: 6 },
                { key: 'player', frame: 9 },
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stand_left', frames: [ { key: 'player', frame: 6 }, ], frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: 'stand_right', frames: [ { key: 'player', frame: 1 }, ], frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: 'stand_up', frames: [ { key: 'player', frame: 0 }, ], frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: 'stand_down', frames: [ { key: 'player', frame: 5 }, ], frameRate: 10, repeat: -1
        });

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

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y); // create a new Player entity at spawn
        
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