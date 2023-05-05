"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerData {
    constructor(playerData) {
        this.storageKey = 'playerData';
        console.log('PlayerData constructor:', playerData);
        this.data = playerData;
        console.log('PlayerData constructed:', this);
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
    }
    setActive(active) {
        this.data.active = active;
    }
    saveData() {
        const data = JSON.stringify(this.data);
        localStorage.setItem(this.storageKey, data);
        console.log('Player data saved to localStorage:', this.data);
    }
}
exports.default = PlayerData;
//# sourceMappingURL=PlayerData.js.map