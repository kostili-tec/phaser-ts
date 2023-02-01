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

  move(x: number, y: number) {
    return new Promise((animationResolve) => {
      this.scene.tweens.add({
        targets: this,
        ease: 'Linear',
        x,
        y,
        duration: 100,
        onComplete: animationResolve
      })
    })  
  }

  async flip() {
    return new Promise((animationResolve) => {
      const show = () => {
        const texture = this._isOpen ? 'card' + this.id : 'card';

        this.setTexture(texture);
  
        this.scene.tweens.add( {
          targets: this,
          scaleX: 1,
          ease: 'Linear',
          duration: 150,
          onComplete: animationResolve
        })

      }
      this.scene.tweens.add( {
        targets: this,
        scaleX: 0,
        ease: 'Linear',
        duration: 150,
        onComplete: show        
      })

    })
  }

  async open() {
    this._isOpen = true;
    await this.flip()
  }

  async close() {
    this._isOpen = false;
    await this.flip()
  }

}