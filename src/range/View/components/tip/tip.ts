import styleClasses from "../../styleClasses";

class Tip {
  private dom: HTMLDivElement;

  public saveDom(element: HTMLDivElement) {
    this.dom = element;
  }

  public getDom(): HTMLDivElement {
    return this.dom;
  }

  constructor() {

  }

  public getHTML(): HTMLDivElement {
      const tipHTML = document.createElement('div');
      tipHTML.classList.add(`${styleClasses.TIP}`);

      this.saveDom(tipHTML);

      return tipHTML;
    }
}

export default Tip;