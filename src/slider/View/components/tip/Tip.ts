import IValidSettings from '../../../interfaces/IValidSettings';
import styleClasses from '../../styleClasses';

class Tip {
  constructor (settings: IValidSettings) {
    this.settings = settings;
    this.createDom();
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public createDom (): void {
    const tipHTML = document.createElement('div');
    tipHTML.classList.add(`${styleClasses.TIP}`);

    this.dom = tipHTML;
  }

  public setTipValue (value: string): void {
    this.dom.innerHTML = value;
  }

  public updateState (settings: IValidSettings): void {
    this.settings = settings;
    this.updateStyles();
  }

  private updateStyles (): void {
    const { isVertical } = this.settings;
    const beforeOrient = !!isVertical;

    if (beforeOrient) {
      this.dom.classList.remove(`${styleClasses.TIP_HORIZONTAL}`);
    } else {
      this.dom.classList.remove(`${styleClasses.TIP_VERTICAL}`);
    }

    if (isVertical) {
      this.dom.classList.add(`${styleClasses.TIP_VERTICAL}`);
    } else {
      this.dom.classList.add(`${styleClasses.TIP_HORIZONTAL}`);
    }
  }

  private dom: HTMLDivElement;

  private settings: IValidSettings;
}

export default Tip;
