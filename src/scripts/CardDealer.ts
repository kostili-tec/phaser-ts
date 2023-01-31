import { CardPosition, Card } from './Card';
import { GameObjects, Scene } from "phaser";
import gameConfig from './gameConfig';

export class CardDealer {
  private _scene: Scene

  constructor(scene: Scene) {
    this._scene = scene;
  }
  createCards() {
    const possibleCardIds: Card['id'][] = ['1', '2', '3', '4', '5'];
  }

  private getCardsPositions() {
    const cardsPositions: CardPosition[] = [];

    const screenWidth = gameConfig.screenWidth;
    const screenHeight = gameConfig.screenHeight;

    const cardTexture = this._scene.textures.get('card').getSourceImage();

    const cardWidth = cardTexture.width;
    const cardHeight = cardTexture.height;

    const cardMargin = 4;

    const cols = 5;
    const rows = 2;

    const marginLeft = (screenWidth - cardWidth * cols) / 2 + cardWidth;
    const marginTop = (screenHeight - cardHeight * rows) / 2 + cardHeight;

        // Создаем матрицу позиций для карт
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = marginLeft + col * (cardWidth + cardMargin)
            const y = marginTop + row * (cardHeight + cardMargin)
            cardsPositions.push({ x, y })
          }
        }
  }
}