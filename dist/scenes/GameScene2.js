"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameSceneBase_1 = __importDefault(require("../GameSceneBase"));
const ZONE = "building1";
class GameScene2 extends GameSceneBase_1.default {
    constructor() {
        super('GameScene2', ZONE);
    }
    preload() {
        this.preloadResources();
    }
}
exports.default = GameScene2;
//# sourceMappingURL=GameScene2.js.map