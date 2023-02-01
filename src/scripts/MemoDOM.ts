type MenuRenderProps = {
  type: 'start' | 'end'
  isWin?: boolean
}

export class MemoDOM {
  private _elementDOM!: HTMLElement

  onStartGame: (() => unknown | null) | undefined;
  onRestarGame: (() => unknown | null) | undefined;

  render({ type, isWin }: MenuRenderProps) {
    const container = document.createElement('div');
    container.innerHTML = type === 'start' 
    ? this.startTemplate()
    : this.restartTemplate(isWin);

    this._elementDOM = container.firstElementChild as HTMLElement

    const buttonDom = this._elementDOM.querySelector('button') as HTMLButtonElement;

    buttonDom.onclick = () => {
      this._elementDOM.remove();

      type === 'start' 
      ? this.onStartGame?.()
      : this.onRestarGame?.()
    }

    document.body.append(this._elementDOM);

  }

  private startTemplate = () => /*html*/`
  <div class="menu">
    <span>ИГРА</span>
    <button>НАЧАТЬ</button>
  </div>`

  private restartTemplate = (isWin?: boolean) => /*html*/`
  <div class="menu">
    <span>${isWin ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}</span>
    <button>ИГРАТЬ СНОВА?</button>
  </div>`
}