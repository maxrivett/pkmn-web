"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const TILE_WIDTH = 32;
const VELOCITY_EPSILON = 1e-2; // velocity close to zero
const WALK_SPEED = 80; // pixels/second travel, used in moveTo
const RUN_SPEED = 140;
class Player extends phaser_1.default.Physics.Arcade.Sprite {
    constructor(scene, x, y, playerData) {
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
        this.playerData = playerData;
        this.direction = this.playerData.getDirection() || 1 /* MOVEMENT_DIRECTION.Up */;
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
        // used for movement checking only (so that no diagonal)
        var directionLocal = 0;
        // So that player doesn't get caught between tiles
        let modTargetX = (this.target.x % TILE_WIDTH) - (TILE_WIDTH / 2);
        let modTargetY = (this.target.y % TILE_WIDTH) - (TILE_WIDTH / 2);
        // Standing sprite if no movement
        if (this.target.x === this.x && this.target.y === this.y) {
            switch (this.direction) {
                case 1 /* MOVEMENT_DIRECTION.Up */:
                    this.anims.play('stand_up', true);
                    break;
                case 2 /* MOVEMENT_DIRECTION.Down */:
                    this.anims.play('stand_down', true);
                    break;
                case 3 /* MOVEMENT_DIRECTION.Left */:
                    this.anims.play('stand_left', true);
                    break;
                case 4 /* MOVEMENT_DIRECTION.Right */:
                    this.anims.play('stand_right', true);
                    break;
                default:
                    break;
            }
        }
        // Check for input and update target if necessary
        if (phaser_1.default.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            if (((_a = this.cursorKeys.up) === null || _a === void 0 ? void 0 : _a.isDown) && (directionLocal == 0 || directionLocal == 1 /* MOVEMENT_DIRECTION.Up */)) {
                this.target.y -= (modTargetY === 0) ? TILE_WIDTH : (TILE_WIDTH - Math.abs(modTargetY));
                this.direction = 1 /* MOVEMENT_DIRECTION.Up */;
                directionLocal = 1 /* MOVEMENT_DIRECTION.Up */;
                this.anims.play('up', true);
                this.playerData.setActive(true);
            }
            else if (((_b = this.cursorKeys.down) === null || _b === void 0 ? void 0 : _b.isDown) && (directionLocal == 0 || directionLocal == 2 /* MOVEMENT_DIRECTION.Down */)) {
                this.target.y += (modTargetY === 0) ? TILE_WIDTH : (TILE_WIDTH - Math.abs(modTargetY));
                this.direction = 2 /* MOVEMENT_DIRECTION.Down */;
                directionLocal = 2 /* MOVEMENT_DIRECTION.Down */;
                this.anims.play('down', true);
                this.playerData.setActive(true);
            }
            if (((_c = this.cursorKeys.left) === null || _c === void 0 ? void 0 : _c.isDown) && (directionLocal == 0 || directionLocal == 3 /* MOVEMENT_DIRECTION.Left */)) {
                this.target.x -= (modTargetX === 0) ? TILE_WIDTH : (TILE_WIDTH - Math.abs(modTargetX));
                this.direction = 3 /* MOVEMENT_DIRECTION.Left */;
                directionLocal = 3 /* MOVEMENT_DIRECTION.Left */;
                this.anims.play('left', true);
                this.playerData.setActive(true);
            }
            else if (((_d = this.cursorKeys.right) === null || _d === void 0 ? void 0 : _d.isDown) && (directionLocal == 0 || directionLocal == 4 /* MOVEMENT_DIRECTION.Right */)) {
                this.target.x += (modTargetX === 0) ? TILE_WIDTH : (TILE_WIDTH - Math.abs(modTargetX));
                this.direction = 4 /* MOVEMENT_DIRECTION.Right */;
                directionLocal = 4 /* MOVEMENT_DIRECTION.Right */;
                this.anims.play('right', true);
                this.playerData.setActive(true);
            }
        }
        // Move towards target
        this.scene.physics.moveTo(this, this.target.x, this.target.y, WALK_SPEED);
        // If close enough to target, snap position to target
        if (phaser_1.default.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 1) {
            this.setPosition(this.target.x, this.target.y);
            this.body.reset(this.target.x, this.target.y);
        }
    }
    getDirection() {
        return this.direction;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map