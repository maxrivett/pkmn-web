"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const TILE_WIDTH = 16;
const VELOCITY_EPSILON = 1e-2; // velocity close to zero
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
        // Initialize the target
        this.target = new phaser_1.default.Math.Vector2(this.x, this.y);
    }
    update() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        // If the player isn't moving and should be, reset target (so that doesn't get stuck to objects)
        console.log('x vel: ' + this.body.velocity.x);
        console.log('y vel: ' + this.body.velocity.y);
        console.log('condition' + (this.x !== this.target.x || this.y !== this.target.y));
        if (Math.abs(this.body.velocity.x) <= VELOCITY_EPSILON &&
            Math.abs(this.body.velocity.y) <= VELOCITY_EPSILON &&
            (this.x !== this.target.x || this.y !== this.target.y)) {
            this.target.x = this.x;
            this.target.y = this.y;
        }
        // Check for input and update target if necessary
        if (phaser_1.default.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            if (((_a = this.cursorKeys.up) === null || _a === void 0 ? void 0 : _a.isDown) && !((_b = this.cursorKeys.left) === null || _b === void 0 ? void 0 : _b.isDown) && !((_c = this.cursorKeys.right) === null || _c === void 0 ? void 0 : _c.isDown)) {
                this.target.y -= TILE_WIDTH;
            }
            else if (((_d = this.cursorKeys.down) === null || _d === void 0 ? void 0 : _d.isDown) && !((_e = this.cursorKeys.left) === null || _e === void 0 ? void 0 : _e.isDown) && !((_f = this.cursorKeys.right) === null || _f === void 0 ? void 0 : _f.isDown)) {
                this.target.y += TILE_WIDTH;
            }
            else if (((_g = this.cursorKeys.left) === null || _g === void 0 ? void 0 : _g.isDown) && !((_h = this.cursorKeys.up) === null || _h === void 0 ? void 0 : _h.isDown) && !((_j = this.cursorKeys.down) === null || _j === void 0 ? void 0 : _j.isDown)) {
                this.target.x -= TILE_WIDTH;
            }
            else if (((_k = this.cursorKeys.right) === null || _k === void 0 ? void 0 : _k.isDown) && !((_l = this.cursorKeys.up) === null || _l === void 0 ? void 0 : _l.isDown) && !((_m = this.cursorKeys.down) === null || _m === void 0 ? void 0 : _m.isDown)) {
                this.target.x += TILE_WIDTH;
            }
        }
        // Move towards target
        this.scene.physics.moveTo(this, this.target.x, this.target.y, 100);
        // If close enough to target, snap position to target
        if (phaser_1.default.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            this.setPosition(this.target.x, this.target.y);
            this.body.reset(this.target.x, this.target.y);
        }
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map