"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const FONT = 'PokemonPixel';
class Pokemon extends phaser_1.default.Scene {
    constructor(playerData) {
        super('Pokemon');
        this.pokemonSprites = [];
        this.selectedPokemonIndex = 0;
        this.playerData = playerData;
    }
    preload() {
        // iterate through list and load by name
        this.playerData.getPokemon().forEach(mon => {
            this.load.image(mon, `assets/sprites/pokemon/${mon}/front.png`);
        });
        // load poke json data
        this.load.json('pokemonData', './data/pokemon.json');
    }
    create() {
        const pokemonData = this.cache.json.get('pokemonData')[0];
        this.closeButton = this.add.text(this.cameras.main.width - 100, 20, 'Close', {
            fontFamily: FONT,
            // fontSize: 50,
            // color: '#000000',
        }).setInteractive();
        // Add a background to cover the other scene
        const backgroundColor = 0x87ceeb; // Light blue, change the color as needed
        const background = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, this.cameras.main.width, this.cameras.main.height, backgroundColor);
        const pokemonPerRow = 2;
        const startX = this.cameras.main.centerX / 2;
        const startY = this.cameras.main.centerY / 2;
        const paddingX = 200;
        const paddingY = 200;
        let currentX = startX;
        let currentY = startY;
        const font = { fontFamily: FONT, fontSize: '24px', color: '#000000' };
        this.playerData.getPokemon().forEach((mon, index) => {
            const pokemonSprite = this.add.image(currentX, currentY, mon);
            this.pokemonSprites.push(pokemonSprite);
            const hp = pokemonData.species[mon].stats.hp; // access pokemon's data from json
            // Display the Pokemon name, level, and HP
            const pokemonName = this.add.text(currentX - 50, currentY + 50, mon, font);
            const pokemonLevel = this.add.text(currentX - 50, currentY + 75, 'Lv. 100', font);
            const pokemonHP = this.add.text(currentX - 50, currentY + 100, `HP: 10/${hp}`, font);
            // Increment position for the next Pokemon
            if ((index + 1) % pokemonPerRow === 0) {
                currentY += paddingY;
                currentX = startX;
            }
            else {
                currentX += paddingX;
            }
        });
        // Initialize the hover state for the first Pokemon
        this.pokemonSprites[0].setTint(0xff0000);
        // Add keyboard input listeners
        this.cursors = this.scene.scene.input.keyboard.createCursorKeys();
        this.actionKey = this.scene.scene.input.keyboard.addKey(phaser_1.default.Input.Keyboard.KeyCodes.A);
        this.scene.scene.input.keyboard.on('keydown', (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                this.navigatePokemon(event.key);
            }
        });
        this.actionKey.on('down', () => {
            this.activatePokemon();
        });
        // Add a button to close the Pokemon scene and return to the game
        const closeButton = this.add.text(this.cameras.main.width - 100, 20, 'Close', font).setInteractive();
        closeButton.on('pointerdown', () => {
            this.scene.stop('Pokemon');
            // this.scene.resume('GameScene1'); // Replace 'YourGameSceneKey' with the key of your game scene
        });
    }
    navigatePokemon(direction) {
        // Deselect the current Pokemon
        if (this.selectedPokemonIndex < this.pokemonSprites.length) {
            this.pokemonSprites[this.selectedPokemonIndex].clearTint();
        }
        else {
            this.closeButton.setStyle({ color: '#000000' });
        }
        const pokemonPerRow = 2;
        const pokemonCount = this.pokemonSprites.length;
        switch (direction) {
            case 'ArrowUp':
                if (this.selectedPokemonIndex < pokemonPerRow) {
                    this.selectedPokemonIndex = pokemonCount;
                }
                else {
                    this.selectedPokemonIndex = (this.selectedPokemonIndex - pokemonPerRow + pokemonCount) % pokemonCount;
                }
                break;
            case 'ArrowDown':
                if (this.selectedPokemonIndex === pokemonCount - 1) {
                    this.selectedPokemonIndex = pokemonCount;
                }
                else {
                    this.selectedPokemonIndex = (this.selectedPokemonIndex + pokemonPerRow) % pokemonCount;
                }
                break;
            case 'ArrowLeft':
                this.selectedPokemonIndex = (this.selectedPokemonIndex - 1 + pokemonCount + 1) % (pokemonCount + 1);
                break;
            case 'ArrowRight':
                this.selectedPokemonIndex = (this.selectedPokemonIndex + 1) % (pokemonCount + 1);
                break;
        }
        // Check if the Close button should be selected
        if (this.selectedPokemonIndex === pokemonCount) {
            // Select the Close button
            this.closeButton.setStyle({ color: '#ff0000' });
        }
        else {
            // Select the new Pokemon
            this.pokemonSprites[this.selectedPokemonIndex].setTint(0xff0000);
        }
    }
    activatePokemon() {
        console.log('Selected Pokemon:', this.pokemonSprites[this.selectedPokemonIndex].texture.key);
        // if (this.selectedPokemonIndex === this.pokemonSprites.length - 1) {
        //   // Close the Pokemon scene if the Close button is selected
        //   this.scene.stop('Pokemon');
        //   // this.scene.resume('GameScene1'); // Replace 'YourGameSceneKey' with the key of your game scene
        // } else {
        //   // Print the selected Pokemon's name to the console
        //   console.log('Selected Pokemon:', this.pokemonSprites[this.selectedPokemonIndex].texture.key);
        // }
    }
}
exports.default = Pokemon;
//# sourceMappingURL=Pokemon.js.map