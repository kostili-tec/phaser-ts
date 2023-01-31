import { Scene } from "phaser";
import { Card } from '../Card'; 

export class GameScene extends Scene {
  constructor() {
    super('GameScene')
  }

  onCardClick(_: unknown, object: unknown) {
    console.log('click');
    console.log(object);
  }

  create() {
    const card = new Card(this, 250, 500);
    // card.setOrigin(0)
    this.input.on('gameobjectdown', this.onCardClick);
  }
}