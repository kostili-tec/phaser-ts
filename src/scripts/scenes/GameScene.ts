import { Scene } from "phaser";
import { Card } from '../Card'; 

export class GameScene extends Scene {
  constructor() {
    super('GameScene')
  }

  onCardClick(_: unknown, object: Card) {
    if (object instanceof Card) {
      object.open()
    }
  }

  create() {
    const card = new Card(this, {
      x: 250, 
      y: 500,
      id: '2'
  });
    // card.setOrigin(0)
    this.input.on('gameobjectdown', this.onCardClick);
  }
}