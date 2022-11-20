import IValidSettings from '../../../interfaces/IValidSettings';
import styleClasses from '../../styleClasses';

class Step {
  constructor (settings: IValidSettings) {
    this.settings = settings;
    this.getHTML();
  }

  public getDom (): HTMLElement {
    return this.dom;
  }

  public getHTML ():void {
    const steps = document.createElement('ul');
    steps.classList.add(`${styleClasses.STEP}`);

    this.dom = steps;
  }

  public addItem (value: number): HTMLElement {
    const itemStep = document.createElement('li');
    itemStep.classList.add(`${styleClasses.STEP_ITEM}`);
    itemStep.setAttribute('data-val', `${value}`);
    itemStep.innerHTML = `${value}`;
    this.dom.appendChild(itemStep);

    return itemStep;
  }

  public getItems (): NodeListOf<HTMLElement> {
    const stepsList = this.dom.querySelectorAll(`.${styleClasses.STEP} li`);
    return stepsList as NodeListOf<HTMLElement>;
  }

  public updateState (settings: IValidSettings): void {
    this.settings = settings;
    this.updateStyles();
    this.renderSteps();
  }

  private updateStyles (): void {
    const { isVertical } = this.settings;
    const beforeOrient = !!isVertical;

    if (beforeOrient) {
      this.dom.classList.remove(`${styleClasses.STEP_HORIZONTAL}`);
      this.getItems().forEach((item) => {
        item.classList.remove(`${styleClasses.STEP_ITEM}`);
      });
    } else {
      this.dom.classList.remove(`${styleClasses.STEP_VERTICAL}`);
      this.getItems().forEach((item) => {
        item.classList.remove(`${styleClasses.STEP_ITEM}`);
      });
    }

    if (isVertical) {
      this.dom.classList.add(`${styleClasses.STEP_VERTICAL}`);
      this.getItems().forEach((item) => {
        item.classList.add(`${styleClasses.STEP_ITEM}`);
      });
    } else {
      this.dom.classList.add(`${styleClasses.STEP_HORIZONTAL}`);
      this.getItems().forEach((item) => {
        item.classList.add(`${styleClasses.STEP_ITEM}`);
      });
    }
  }

  public renderSteps ():void {
    const { isVertical } = this.settings;
    const values = this.getStepsValue();
    const side = isVertical ? "top" : "left";
    const arrayItems = [];
    this.dom.innerHTML = "";

    values.forEach((el) => {
      arrayItems.push(el);
    })

    if (arrayItems.length === 5) {
      let percent = 0;
      values.map((item) => {
        const domItem = this.addItem(Number(item.toFixed(2)));

        if (percent > 75) {
          percent = 100;
        }

        domItem.style[side] = `${percent}%`;
        percent += 25;

        return 0;
      });
    } else {
      values.map((item) => {
        const domItem = this.addItem(Number(item.toFixed(2)));
        let percent = this.convertPercentValueTo(item);
        if (percent >= 90 && percent < 100) percent = 85;
        domItem.style[side] = `${percent}%`;
        return 0;
      });
    }
  }

  private convertPercentValueTo (val: number) {
    const { isVertical, minValue, maxValue } = this.settings;
    const percent = Number(
      (((val - minValue) * 100) / (maxValue - minValue)).toFixed(10),
    );
    const okPercent = isVertical ? 100 - percent : percent;

    return okPercent;
  }

  private getStepsValue (): number[] {
    const { maxValue, minValue, step } = this.settings;
    const middleValue = Math.ceil((maxValue - minValue) / step);
    let quantitySteps = 6;
    const limitationSteps = maxValue > 1e5 && maxValue <= 1e7;
    const limitationStepsMin = minValue < -1e5 && minValue >= -1e7;

    if (limitationSteps) quantitySteps = 4;
    if (limitationStepsMin) quantitySteps = 4;

    if (maxValue > 1e7) quantitySteps = 2;
    if (maxValue > 1e16) quantitySteps = 1;

    if (minValue < -1e7) quantitySteps = 2;
    if (minValue < -1e16) quantitySteps = 1;

    const viewStep = Math.ceil(middleValue / quantitySteps) * step;
    const middleArr = [];
    let value = minValue;

    for (let i = 0; value < maxValue; i += 1) {
      value += viewStep;

      if (value < maxValue) {
        middleArr.push(value);
      }
    }

    return [minValue, ...middleArr, maxValue];
  }

  private dom: HTMLElement;

  private settings: IValidSettings;
}

export default Step;