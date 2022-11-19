import IValidSettings from '../../../interfaces/IValidSettings';
import styleClasses from '../../styleClasses';

class Bar {
  constructor (settings: IValidSettings) {
    this.settings = settings;
    this.getHTML();
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public getHTML (): void {
    const htmlBar = document.createElement('div');
    htmlBar.classList.add(`${styleClasses.BAR}`);

    this.dom = htmlBar;
  }

  updateState (settings: IValidSettings): void {
    this.settings = settings;
    this.updateStyles();
  }

  updateStyles (): void {
    const { isVertical } = this.settings;
    const beforeOrient = !!isVertical;

    if (beforeOrient) {
      this.dom.classList.remove(`${styleClasses.BAR_HORIZONTAL}`);
    } else {
      this.dom.classList.remove(`${styleClasses.BAR_VERTICAL}`);
    }

    if (isVertical) {
      this.dom.classList.add(`${styleClasses.BAR_VERTICAL}`);
    } else {
      this.dom.classList.add(`${styleClasses.BAR_HORIZONTAL}`);
    }
  }

  public getLength (): number {
    const { isVertical } = this.settings;
    const lengthType = isVertical ? "offsetHeight" : "offsetWidth";
    const length = this.dom[lengthType];

    return length;
  }

  public getOffset (): number {
    const { isVertical } = this.settings;
    const offsetSide = isVertical ? "bottom" : "left";
    const offset = this.dom.getBoundingClientRect()[offsetSide];

    return offset;
  }

  private dom: HTMLDivElement;

  private settings: IValidSettings;
}

export default Bar;