import styleClasses from "../../styleClasses";

class Step {
  private dom: HTMLElement;

  constructor () {
    this.getHTML();
  }

  public saveDom(element: HTMLElement) {
    this.dom = element;
  }

  public getDom(): HTMLElement {
    return this.dom;
  }

  public getHTML ():ChildNode {
    const steps = document.createElement('ul');
    steps.classList.add(`${styleClasses.STEP}`);

    const step = document.createElement('li');
    step.classList.add(`${styleClasses.STEP_ITEM}`);
    steps.appendChild(step);

    return steps;
  }

  public addItem (value: number): HTMLElement {
    const itemStep = document.createElement('li');
    itemStep.classList.add(`${styleClasses.STEP_ITEM}`);
    itemStep.setAttribute('data-value', `${value}`);
    itemStep.innerHTML = `${value}`;
    this.dom.appendChild(itemStep);

    return itemStep;
  }

  public getItems (): NodeListOf<HTMLElement> {
    const stepsList = this.dom.querySelectorAll(`.${styleClasses.STEP_ITEM}`);
    return stepsList as NodeListOf<HTMLElement>;
  }
}

export default Step;