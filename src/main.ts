import Phaser from 'phaser';
import GameScene from './GameScene';

const config: Phaser.Types.Core.GameConfig = {
    title: 'Pokemon Game',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: [GameScene],
    backgroundColor: '#eeeeee',
};

new Phaser.Game(config);