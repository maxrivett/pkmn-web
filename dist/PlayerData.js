"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerData {
    constructor(playerData) {
        this.storageKey = 'playerData';
        this.data = playerData;
    }
    getCurrentScene() {
        return this.data.currentScene;
    }
    setCurrentScene(scene) {
        this.data.currentScene = scene;
    }
    getPosition() {
        return this.data.position;
    }
    setPosition(x, y) {
        this.data.position.x = x;
        this.data.position.y = y;
    }
    isActive() {
        return this.data.active;
        // return this.data && this.data.active;
    }
    setActive(active) {
        this.data.active = active;
    }
    getDirection() {
        return this.data.direction;
    }
    setDirectionString(direction) {
        switch (direction) {
            case ("Up"):
                this.data.direction = 1;
                break;
            case ("Down"):
                this.data.direction = 2;
                break;
            case ("Left"):
                this.data.direction = 3;
                break;
            case ("Right"):
                this.data.direction = 4;
                break;
            default:
                this.data.direction = 1;
                break;
        }
    }
    setDirectionInteger(direction) {
        this.data.direction = direction;
    }
    saveData() {
        const data = JSON.stringify(this.data);
        localStorage.setItem(this.storageKey, data);
    }
}
exports.default = PlayerData;
//# sourceMappingURL=PlayerData.js.map