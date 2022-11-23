import IValidSettings from '../../../interfaces/IValidSettings';
import styleClasses from '../../styleClasses';

class Slider {
  constructor (settings: IValidSettings) {
    this.settings = settings;
    this.getHTML();
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public updateState (settings: IValidSettings) {
    this.settings = settings;
    this.updateStyles();
  }

  private updateStyles (): void {
    const { isVertical } = this.settings;
    this.dom.setAttribute("class", `${styleClasses.SLIDER}`);

    if (isVertical) {
      this.dom.classList.add(`${styleClasses.SLIDER_VERTICAL}`);
    } else {
      this.dom.classList.add(`${styleClasses.SLIDER_HORIZONTAL}`);
    }
  }

  private getHTML (): void {
    const sliderHTML = document.createElement('div');
    sliderHTML.classList.add(`${styleClasses.SLIDER}`);

    this.dom = sliderHTML;
  }

  private dom: HTMLDivElement;

  private settings: IValidSettings;
}

export default Slider;