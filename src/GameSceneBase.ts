import Phaser from 'phaser';
import Player from './Player';
import Sidebar from './Sidebar'; // Import the Sidebar class
import PlayerData from './PlayerData';


const TILE_WIDTH = 32;
const PLAYER_SPRITE = "cynthia" // change later
const MAP_MAX_WIDTH = 800;
const MAP_MAX_HEIGHT = 600;

export default class GameScene extends Phaser.Scene {
    private player?: Player;
    public playerData!: PlayerData;
    private sidebar?: Sidebar;
    zone: string;
    

    constructor(sceneKey: string, zone: string) {
        super({ key: sceneKey });
        this.zone = zone;
    }

    init(data: { playerData: PlayerData }) {
        this.playerData = data.playerData;
        console.log('GameSceneBase playerData:', this.playerData);
    }

    preload() {
        // Preload assets here
        this.preloadResources();
    }

    create() {
        this.playerData = new PlayerData(this.cache.json.get('playerData'));
        const playerData = this.playerData;

        // (this.plugins.get('PhaserSceneWatcherPlugin') as any).watchAll();
        this.makeAnimations();

        // Create game entities here

        const map = this.make.tilemap({ key: `map_${this.zone}` });
        const tileset = map.addTilesetImage("tileset", "tiles");

        // Layers
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createLayer("World", tileset, 0, 0);
        const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

        // for collisions
        worldLayer.setCollisionBetween(1, 21000, true); // adding collisions for all tiles in the world layer

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });        

        // Spawn Point Object
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

        console.log(this);
        console.log("isActive:", this.playerData.isActive());

        if (!this.playerData.isActive()) { // meaning they just loaded into the game
            const { x, y } = this.playerData.getPosition();
            this.player = new Player(this, x, y); // create a new Player entity at last save
            this.playerData.setActive(true);
        } else {
            this.player = new Player(this, spawnPoint.x, spawnPoint.y); // create a new Player entity at spawn
        }


        // Exit Object
        const exitPoint = map.findObject("Objects", obj => obj.name === "Exit");
        if (exitPoint) {
            const exit = this.add.rectangle(exitPoint.x, exitPoint.y, TILE_WIDTH / 2, TILE_WIDTH / 2, 0xff0000, 0);
            this.physics.add.existing(exit, true);

            // Collide with exit and start the target scene
            this.physics.add.overlap(this.player, exit, () => {
                const targetScene = (exitPoint as any).properties.find((prop: { name: string; }) => prop.name === "targetScene").value;
                if (targetScene) {
                    this.scene.start(targetScene);
                }
            });
        }

        aboveLayer.setDepth(10) // make sure above player

        // enable physics for the player sprite
        this.physics.add.existing(this.player);
        // for collisions
        this.physics.add.collider(this.player, worldLayer);

        // Calculate offsets for centering
        let offsetX = map.widthInPixels < MAP_MAX_WIDTH ? (MAP_MAX_WIDTH - map.widthInPixels) / 2 : 0;
        let offsetY = map.heightInPixels < MAP_MAX_HEIGHT ? (MAP_MAX_HEIGHT - map.heightInPixels) / 2 : 0;
        // Camera to follow player around
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(-offsetX, -offsetY, map.widthInPixels, map.heightInPixels); 
        // Set the camera position to the center of the scene
        this.cameras.main.setScroll(offsetX, offsetY);
        this.cameras.main.setBackgroundColor('#888888');

        // Sidebar
        this.sidebar = new Sidebar(this, 0, 0, this.playerData, this.player);
        // this.sidebar = new Sidebar(this, this.cameras.main.centerX, this.cameras.main.centerY);
        // this.sidebar.updatePosition(this.cameras.main);

        this.input.keyboard.on('keydown-S', () => {
            if (this.sidebar) {
                this.sidebar.setVisible(!this.sidebar.visible);
            }
        });
    }

    update() {
        // Update game entities here
        if (this.player) {
            this.player.update();
        }
    }
    
    // Player animation
    makeAnimations() {
        // Sprite animations
        if (!this.anims.exists('up')) { // Check if the animation already exists before creating it
            this.anims.create({
                key: 'up',
                frames: [
                    { key: 'player', frame: 0 },
                    { key: 'player', frame: 10 },
                    { key: 'player', frame: 0 },
                    { key: 'player', frame: 2 },
                ],
                frameRate: 10,
                repeat: -1
            });
        }
        if (!this.anims.exists('right')) {
            this.anims.create({
                key: 'right',
                frames: [
                    { key: 'player', frame: 1 },
                    { key: 'player', frame: 4 },
                    { key: 'player', frame: 1 },
                    { key: 'player', frame: 7 },
                ],
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('down')) {
            this.anims.create({
                key: 'down',
                frames: [
                    { key: 'player', frame: 5 },
                    { key: 'player', frame: 8 },
                    { key: 'player', frame: 5 },
                    { key: 'player', frame: 11 },
                ],
                frameRate: 10,
                repeat: -1
            });
        }
        
        if (!this.anims.exists('left')) {
            this.anims.create({
                key: 'left',
                frames: [
                    { key: 'player', frame: 6 },
                    { key: 'player', frame: 3 },
                    { key: 'player', frame: 6 },
                    { key: 'player', frame: 9 },
                ],
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('stand_left')) {
            this.anims.create({
                key: 'stand_left', frames: [ { key: 'player', frame: 6 }, ], frameRate: 10, repeat: -1
            });
        }
        if (!this.anims.exists('stand_right')) {
            this.anims.create({
                key: 'stand_right', frames: [ { key: 'player', frame: 1 }, ], frameRate: 10, repeat: -1
            });
        }
        if (!this.anims.exists('stand_up')) {
            this.anims.create({
                key: 'stand_up', frames: [ { key: 'player', frame: 0 }, ], frameRate: 10, repeat: -1
            });
        }
        if (!this.anims.exists('stand_down')) {
            this.anims.create({
                key: 'stand_down', frames: [ { key: 'player', frame: 5 }, ], frameRate: 10, repeat: -1
            });
        }
    }

    preloadResources() {
        // keys can load only once. This is why we do different keys for all maps (not necessary for tileset since the same for all)
        this.load.image("tiles", "../assets/tiles/tileset.png");
        this.load.tilemapTiledJSON(`map_${this.zone}`, `../assets/tiles/${this.zone}/tilemap.json`);
        this.load.json('playerData', '../data/player.json');

            // Load the sprite sheet
        this.load.spritesheet('player', `../assets/sprites/player/${PLAYER_SPRITE}sheet.png`, { frameWidth: 32, frameHeight: 32 });

      

        // Scene Watcher
        // this.load.plugin('PhaserSceneWatcherPlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-scene-watcher@6.0.0/dist/phaser-plugin-scene-watcher.umd.js', true);
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'); // for font
    }
}

