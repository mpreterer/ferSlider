import styleClasses from "../../styleClasses";

class Range {
  constructor () {
    this.getHTML();
  }

  public saveDom (element: HTMLDivElement) {
    this.dom = element;
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public getHTML () {
    const htmlRange = document.createElement('div');
    htmlRange.classList.add(`${styleClasses.RANGE}`);

    this.saveDom(htmlRange);
  }

  private dom: HTMLDivElement;
}

export default Range;
