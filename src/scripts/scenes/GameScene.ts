import { Scene } from "phaser";
import { Card } from '../Card';
import { CardDealer } from '../CardDealer';
import { MemoDOM } from '../MemoDOM';
import { Timer } from '../Timer';

type SceneCreateProps = {
  isRestart?: boolean
}
export class GameScene extends Scene {
  private _cardDealer!: CardDealer;
  private _menuDOM!: MemoDOM;
  private _timer!: Timer;
  private _isGameOver!: boolean;

    
  onStartGame = async () => {
    await this._cardDealer.createCards()
    this._timer.start();
    this.input.on('gameobjectdown', this.onCardClick);
  }

  onRestarGame = () => {
    this.scene.restart({ isRestart: true} );
  }

  onCardClick = (_: unknown, card: Card) => {
    if (this._isGameOver) 
    return
    this._cardDealer.openCard(card);
  }

  onTimeIsOver = () => {
    this._menuDOM.render({ type: 'end', isWin: false });
    this._isGameOver = true;
  }

  handleAllCardsOpen = () => {
    this._menuDOM.render( {type: 'end', isWin: true });
    this._timer.stop();
    this._isGameOver = true;
  }
  constructor() {
    super('GameScene')
  }

  async create({ isRestart }: SceneCreateProps) {
    this._isGameOver = false;
   this._cardDealer = new CardDealer(this);

   this._timer = new Timer(this, {
    x: 600,
    y: 10,
    maxTime: 30,
   })
   this._menuDOM = new MemoDOM();

   isRestart 
    ? this.onStartGame()
    : this._menuDOM.render({ type: 'start' });
   this.initEvents();
  }

  initEvents() {
    this._menuDOM.onStartGame = this.onStartGame;
    this._menuDOM.onRestarGame = this.onRestarGame;
    this._cardDealer.onAllCardsOpen = this.handleAllCardsOpen;
    this._timer.onTimeIsOver = this.onTimeIsOver

  }
}