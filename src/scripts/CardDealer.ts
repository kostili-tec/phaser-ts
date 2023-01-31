import { CardPosition, Card } from './Card';
import { GameObjects, Scene, Utils } from "phaser";
import gameConfig from './gameConfig';

export class CardDealer {
  private _scene: Scene
  private prevOpenCard: Card | null = null;
  private guessedPairs = 0;
  private possibleCardIds: Card['id'][] = ['1', '2', '3', '4', '5']

  public onAllCardsOpen: (...args: any) => any = () => null;
  constructor(scene: Scene) {
    this._scene = scene;
  }

  openCard(card: Card) {

    if (card.isOpen)
    return

    card.open();

    if (!this.prevOpenCard) {
      this.prevOpenCard = card;
      return
    }

    if (this.prevOpenCard.id === card.id) {
      this.guessedPairs += 1;
    } else {
      this.prevOpenCard.close();
      card.close();
    }
    this.prevOpenCard = null;

    if (this.guessedPairs === this.possibleCardIds.length) {
      this.onAllCardsOpen()
    }
  }
  createCards() {   
    const allCardsPosition = Utils.Array.Shuffle([...this.possibleCardIds, ...this.possibleCardIds]);
    const cardPosition = this.getCardsPositions();

    allCardsPosition.forEach((cardId, ind) => {
      const { x, y } = cardPosition[ind];
      const card = new Card(this._scene, { x, y, id: cardId  });
    })
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

    const marginLeft = (screenWidth - cardWidth * cols) / 2 + cardWidth / 2;
    const marginTop = (screenHeight - cardHeight * rows) / 2 + cardHeight /2;

    // Создаем матрицу позиций для карт
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = marginLeft + col * (cardWidth + cardMargin)
        const y = marginTop + row * (cardHeight + cardMargin)
        cardsPositions.push({ x, y })
      }
    }
    return cardsPositions;
  }
}