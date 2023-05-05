"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const webfontloader_1 = __importDefault(require("webfontloader"));
const PlayerData_1 = __importDefault(require("../PlayerData"));
class BootScene extends phaser_1.default.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the font using the WebFontLoader
            webfontloader_1.default.load({
                custom: {
                    families: ['PokemonPixel'],
                    urls: ['/assets/fonts/fonts.css']
                },
                active: () => {
                    this.fontLoaded();
                }
            });
            // Load player data
            this.playerData = yield this.loadPlayerData();
            console.log('BootScene playerData:', this.playerData);
        });
    }
    fontLoaded() {
        // Start the next scene when the font is loaded
        this.scene.start(this.playerData.getCurrentScene(), { playerData: this.playerData });
    }
    loadPlayerData() {
        return new Promise((resolve) => {
            this.load.json('playerData', '../data/player.json');
            this.load.once('filecomplete-json-playerData', () => {
                const playerData = this.cache.json.get('playerData');
                this.load.removeListener('filecomplete-json-playerData');
                resolve(new PlayerData_1.default(playerData));
            });
            this.load.start();
        });
    }
}
exports.default = BootScene;
//# sourceMappingURL=BootScene.js.map