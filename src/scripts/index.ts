import { Game, Types, AUTO } from 'phaser';
import test from '../assets/test.jpg';
import card from '../assets/card/card1.png';
import { PreloadScene } from '../scripts/scenes/PreloadScene';
import { GameScene } from '../scripts/scenes/GameScene';

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1280,
    height: 980,
    backgroundColor: '#6e6666',
    scene: [
        PreloadScene,
        GameScene
    ]
}

new Game(config);
