"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const BootScene_1 = __importDefault(require("./scenes/BootScene"));
const GameScene1_1 = __importDefault(require("./scenes/GameScene1"));
const GameScene2_1 = __importDefault(require("./scenes/GameScene2"));
const config = {
    title: 'Pokemon Game',
    type: phaser_1.default.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        },
    },
    scene: [BootScene_1.default, GameScene1_1.default, GameScene2_1.default],
    backgroundColor: '#000000',
    scale: {
        mode: phaser_1.default.Scale.FIT,
        autoCenter: phaser_1.default.Scale.CENTER_BOTH, // center the game canvas
    },
};
new phaser_1.default.Game(config);
//# sourceMappingURL=main.js.map