import IValidSettings from '../../../interfaces/IValidSettings';
import styleClasses from '../../styleClasses';

class Thumb {
  constructor (settings: IValidSettings) {
    this.settings = settings;
    this.createDom();
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public updateState (settings: IValidSettings):void {
    this.settings = settings;
    this.updateStyles();
  }

  private updateStyles ():void {
    const { isVertical } = this.settings;
    const beforeOrient = !!isVertical;
    const sideStart = isVertical ? "left" : "bottom";

    if (beforeOrient) {
      this.dom.classList.remove(`${styleClasses.THUMB_HORIZONTAL}`);
    } else {
      this.dom.classList.remove(`${styleClasses.THUMB_VERTICAL}`);
    }

    this.dom.style.removeProperty(sideStart);

    if (isVertical) {
      this.dom.classList.add(`${styleClasses.THUMB_VERTICAL}`);
    } else {
      this.dom.classList.add(`${styleClasses.THUMB_HORIZONTAL}`);
    }
  }

  public createDom (): void {
    const thumbHTML = document.createElement('div');
    thumbHTML.classList.add(`${styleClasses.THUMB}`);

    this.dom = thumbHTML;
  }

  public setActive (): void {
    const activeThumb = `${styleClasses.THUMB}_active`;
    this.dom.classList.add(`${activeThumb}`);
  }

  public removeActive (): void {
    const activeThumb = `${styleClasses.THUMB}_active`;
    this.dom.classList.remove(`${activeThumb}`);
  }

  public getThumbPosition (barLenth: number): number {
    const { isVertical } = this.settings;

    const thumbLength = isVertical ? "offsetHeight" : "offsetWidth";
    const offsetType = isVertical ? "offsetTop" : "offsetLeft";
    const posOfPixel = this.dom[offsetType]
      + this.dom[thumbLength] / 2;
    const res = isVertical ? barLenth - posOfPixel : posOfPixel;

    return res;
  }

  public setValue (val: number): void {
    const { isVertical } = this.settings;
    const typeStyleSide = isVertical ? "top" : "left";
    const percent = this.convertPercentValueTo(val);
    if (!isVertical) this.dom.style.top = '';

    this.dom.style[typeStyleSide] = `${percent}%`;
  }

  private convertPercentValueTo (val: number) {
    const { isVertical, minValue, maxValue } = this.settings;

    const percent = Number(
      (((val - minValue) * 100) / (maxValue - minValue)).toFixed(10),
    );
    const okPercent = isVertical ? 100 - percent : percent;

    return okPercent;
  }

  private dom: HTMLDivElement;

  private settings: IValidSettings;
}

export default Thumb;