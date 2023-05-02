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
        var _a, _b, _c, _d;
        // If the player isn't moving and should be, reset target (so that doesn't get stuck to objects)
        if (Math.abs(this.body.velocity.x) <= VELOCITY_EPSILON &&
            Math.abs(this.body.velocity.y) <= VELOCITY_EPSILON &&
            (this.x !== this.target.x || this.y !== this.target.y)) {
            this.target.x = this.x;
            this.target.y = this.y;
        }
        let modTargetX = this.target.x % TILE_WIDTH;
        let modTargetY = this.target.y % TILE_WIDTH;
        var direction = 0;
        // Check for input and update target if necessary
        // TODO: Do not allow diagonal movement
        if (phaser_1.default.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            if (((_a = this.cursorKeys.up) === null || _a === void 0 ? void 0 : _a.isDown) && (direction == 0 || direction == 1 /* MOVEMENT_DIRECTION.Up */)) {
                this.target.y -= (modTargetY === 0) ? TILE_WIDTH : modTargetY;
                direction = 1 /* MOVEMENT_DIRECTION.Up */;
            }
            else if (((_b = this.cursorKeys.down) === null || _b === void 0 ? void 0 : _b.isDown) && (direction == 0 || direction == 2 /* MOVEMENT_DIRECTION.Down */)) {
                this.target.y += (modTargetY === 0) ? TILE_WIDTH : modTargetY;
                direction = 2 /* MOVEMENT_DIRECTION.Down */;
            }
            if (((_c = this.cursorKeys.left) === null || _c === void 0 ? void 0 : _c.isDown) && (direction == 0 || direction == 3 /* MOVEMENT_DIRECTION.Left */)) {
                this.target.x -= (modTargetX === 0) ? TILE_WIDTH : modTargetX;
                direction = 3 /* MOVEMENT_DIRECTION.Left */;
            }
            else if (((_d = this.cursorKeys.right) === null || _d === void 0 ? void 0 : _d.isDown) && (direction == 0 || direction == 4 /* MOVEMENT_DIRECTION.Right */)) {
                this.target.x += (modTargetX === 0) ? TILE_WIDTH : modTargetX;
                direction = 4 /* MOVEMENT_DIRECTION.Right */;
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