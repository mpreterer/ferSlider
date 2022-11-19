import IValidSettings from '../../../interfaces/IValidSettings';
import styleClasses from '../../styleClasses';

class Range {
  constructor (settings: IValidSettings) {
    this.settings = settings;
    this.getHTML();
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public getHTML (): void {
    const htmlRange = document.createElement('div');
    htmlRange.classList.add(`${styleClasses.RANGE}`);

    this.dom = htmlRange;
  }

  public updateState (settings: IValidSettings): void {
    this.settings = settings;
    this.updateStyles();
  }

  private updateStyles (): void {
    const { isVertical } = this.settings;
    const beforeOrient = !!isVertical;
    const sideStart = isVertical ? "left" : "bottom";
    const sideFinish = isVertical ? "right" : "top";

    if (beforeOrient) {
      this.dom.classList.remove(`${styleClasses.RANGE_HORIZONTAL}`);
    } else {
      this.dom.classList.remove(`${styleClasses.RANGE_VERTICAL}`);
    }

    this.dom.style[sideStart] = "0";
    this.dom.style[sideFinish] = "0";

    if (isVertical) {
      this.dom.classList.add(`${styleClasses.RANGE_VERTICAL}`);
    } else {
      this.dom.classList.add(`${styleClasses.RANGE_HORIZONTAL}`);
    }
  }

  private dom: HTMLDivElement;

  private settings: IValidSettings;
}

export default Range;
