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
        this.load.image('player', 'assets/sprites/player.png');
    }
    create() {
        console.log('creating player...');
        // Create game entities here
        this.player = new Player_1.default(this, 400, 300); // create a new Player entity at the center of the screen
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