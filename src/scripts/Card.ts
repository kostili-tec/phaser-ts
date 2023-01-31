import { GameObjects, Scene } from "phaser";

export type CardPosition = { x: number, y: number }
type CardId = '1' | '2' | '3' | '4' | '5'
type CardProps = CardPosition & { id: CardId }
export class Card extends GameObjects.Sprite {
  readonly id: CardId
  private _isOpen = false;
  constructor(scene: Scene, props: CardProps) {
    const { x, y, id } = props;
    super(scene, x, y, 'card')

    this.id = id;

    this.scene.add.existing(this);

    this.setInteractive();
  }

  get isOpen() {
    return this._isOpen;
  }

  open() {
    this._isOpen = true;
    this.setTexture('card' + this.id);
  }

  close() {
    this._isOpen = false;
    this.setTexture('card');
  }

}