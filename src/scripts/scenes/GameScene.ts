import { Scene } from "phaser";
import { Card } from '../Card';
import { CardDealer } from '../CardDealer';

export class GameScene extends Scene {
  cardDealer!: CardDealer;
  onCardClick = (_: unknown, card: Card) => {
    this.cardDealer.openCard(card);
  }
  handleAllCardsOpen = () => {
    this.scene.restart();
  }
  constructor() {
    super('GameScene')
  }

  create() {
   this.cardDealer = new CardDealer(this);
   this.cardDealer.createCards();
   this.initEvents();
  }

  initEvents() {
    this.cardDealer.onAllCardsOpen = this.handleAllCardsOpen
    this.input.on('gameobjectdown', this.onCardClick);

  }
}