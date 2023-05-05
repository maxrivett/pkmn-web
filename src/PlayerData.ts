export default class PlayerData {
    private data: any;
    private storageKey: string = 'playerData'; 

    constructor(playerData: any) {
        console.log('PlayerData constructor:', playerData);
        this.data = playerData;
        console.log('PlayerData constructed:', this); 
    }

    getCurrentScene(): string {
        return this.data.currentScene;
    }

    setCurrentScene(scene: string): void {
        this.data.currentScene = scene;
    }

    getPosition(): { x: number; y: number } {
        return this.data.position;
    }

    setPosition(x: number, y: number): void {
        this.data.position.x = x;
        this.data.position.y = y;
    }

    isActive(): boolean {
        return this.data.active;
    }

    setActive(active: boolean): void {
        this.data.active = active;
    }

    saveData(): void {
        const data = JSON.stringify(this.data);
        localStorage.setItem(this.storageKey, data);
        console.log('Player data saved to localStorage:', this.data);
    }

    // Add more getters and setters for other properties as needed
}