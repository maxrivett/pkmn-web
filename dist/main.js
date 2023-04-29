"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const GameScene_1 = __importDefault(require("./GameScene"));
const config = {
    title: 'Pokemon Game',
    type: phaser_1.default.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: GameScene_1.default,
    backgroundColor: '#eeeeee',
};
new phaser_1.default.Game(config);
//# sourceMappingURL=main.js.map