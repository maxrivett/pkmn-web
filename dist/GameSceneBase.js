"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const Player_1 = __importDefault(require("./Player"));
const TILE_WIDTH = 32;
const PLAYER_SPRITE = "guy"; // change later
// const ZONE = "zone1"; // player location for tilemap
class GameScene extends phaser_1.default.Scene {
    constructor(config) {
        // super({ key: 'GameScene' });
        super(config);
    }
    preload() {
        // Preload assets here
        // this.load.image('player', 'assets/sprites/player.png');
        this.load.image("tiles", "../assets/tiles/tileset.png");
        // this.load.tilemapTiledJSON("map", `../assets/tiles/${ZONE}/tilemap.json`);
        this.load.tilemapTiledJSON("map", `../assets/tiles/${this.zone}/tilemap.json`);
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
            key: 'stand_left', frames: [{ key: 'player', frame: 6 },], frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: 'stand_right', frames: [{ key: 'player', frame: 1 },], frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: 'stand_up', frames: [{ key: 'player', frame: 0 },], frameRate: 10, repeat: -1
        });
        this.anims.create({
            key: 'stand_down', frames: [{ key: 'player', frame: 5 },], frameRate: 10, repeat: -1
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
            tileColor: null,
            collidingTileColor: new phaser_1.default.Display.Color(243, 134, 48, 255),
            faceColor: new phaser_1.default.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y); // create a new Player entity at spawn
        aboveLayer.setDepth(10); // make sure above player
        // enable physics for the player sprite
        this.physics.add.existing(this.player);
        // for collisions
        this.physics.add.collider(this.player, worldLayer);
        // Calculate offsets for centering
        let offsetX = map.widthInPixels < 800 ? (800 - map.widthInPixels) / 2 : 0;
        let offsetY = map.heightInPixels < 600 ? (600 - map.heightInPixels) / 2 : 0;
        // Camera to follow player around
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(-offsetX, -offsetY, map.widthInPixels, map.heightInPixels);
        // Set the camera position to the center of the scene
        // this.cameras.main.setScroll(offsetX, offsetY);
    }
    update() {
        // Update game entities here
        if (this.player) {
            this.player.update();
        }
    }
}
exports.default = GameScene;
//# sourceMappingURL=GameSceneBase.js.map