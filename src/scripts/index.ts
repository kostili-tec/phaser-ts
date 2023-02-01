import { Game, Types, AUTO } from 'phaser';
import { PreloadScene } from '../scripts/scenes/PreloadScene';
import { GameScene } from '../scripts/scenes/GameScene';
import gameConfig from './gameConfig';
import '../styles/index.css'

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: gameConfig.screenWidth,
    height: gameConfig.screenHeight,
    backgroundColor: gameConfig.backgroundColor,
    scene: [
        PreloadScene,
        GameScene
    ]
}

new Game(config);
