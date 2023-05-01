"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
class Player extends phaser_1.default.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        // Add this entity to the scene's physics
        this.scene.physics.world.enable(this);
        // Add this entity to the scene's update list
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        // Initialize the cursor keys
        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    }
    update() {
        var _a, _b, _c, _d;
        // Handle player input and movement here
        if ((_a = this.cursorKeys.up) === null || _a === void 0 ? void 0 : _a.isDown) {
            this.setVelocityY(-100);
        }
        else if ((_b = this.cursorKeys.down) === null || _b === void 0 ? void 0 : _b.isDown) {
            this.setVelocityY(100);
        }
        else {
            this.setVelocityY(0);
        }
        if ((_c = this.cursorKeys.left) === null || _c === void 0 ? void 0 : _c.isDown) {
            this.setVelocityX(-100);
        }
        else if ((_d = this.cursorKeys.right) === null || _d === void 0 ? void 0 : _d.isDown) {
            this.setVelocityX(100);
        }
        else {
            this.setVelocityX(0);
        }
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map