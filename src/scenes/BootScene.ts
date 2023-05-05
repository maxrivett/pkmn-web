import Phaser from 'phaser';
import WebFont from 'webfontloader';
import PlayerData from '../PlayerData';

export default class BootScene extends Phaser.Scene {
    public playerData!: PlayerData;
    constructor() {
        super('BootScene');
    }
  

    async preload() {
        // Load the font using the WebFontLoader
        WebFont.load({
            custom: {
                families: ['PokemonPixel'],
                urls: ['/assets/fonts/fonts.css']
            },
            active: () => {
                this.fontLoaded();
            }
        });

        // Load player data
        this.playerData = await this.loadPlayerData();
        console.log('BootScene playerData:', this.playerData);
    }

    fontLoaded() {
        // Start the next scene when the font is loaded
        this.scene.start(this.playerData.getCurrentScene(), { playerData: this.playerData });
    }

    private loadPlayerData(): Promise<PlayerData> {
        return new Promise((resolve) => {
            this.load.json('playerData', '../data/player.json');
            this.load.once('filecomplete-json-playerData', () => {
                const playerData = this.cache.json.get('playerData');
                this.load.removeListener('filecomplete-json-playerData');
                resolve(new PlayerData(playerData));
            });
            this.load.start();
        });
    }
}