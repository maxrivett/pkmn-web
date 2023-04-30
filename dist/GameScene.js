"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const Player_1 = __importDefault(require("./Player"));
class GameScene extends phaser_1.default.Scene {
    constructor() {
        super({ key: 'GameScene' });
        console.log('constructed');
    }
    preload() {
        // Preload assets here
        this.load.image('tileset', 'assets/tileset.png'); //tileset
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');
        this.load.image('player', 'assets/sprites/player.png');
    }
    create() {
        console.log('creating player...');
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
        this.player = new Player_1.default(this, 400, 300); // create a new Player entity at the center of the screen
        // for collisions
        this.physics.add.collider(this.player, layer2);
        // Camera to follow player around
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerOn(800, 1300);
    }
    update() {
        // Update game entities here
        if (this.player) {
            this.player.update();
        }
    }
}
exports.default = GameScene;
//# sourceMappingURL=GameScene.js.map