"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
class GameScene extends phaser_1.default.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    preload() {
        // Preload assets here
    }
    create() {
        // Create game entities here
    }
    update() {
        // Update game entities here
    }
}
exports.default = GameScene;
//# sourceMappingURL=GameScene.js.map