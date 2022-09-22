import styleClasses from "../../styleClasses";

class Thumb {
  private dom: HTMLDivElement;

  public saveDom (element: HTMLDivElement) {
    this.dom = element;
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public getHTML (): HTMLDivElement {
    const thumbHTML = document.createElement('div');
    thumbHTML.classList.add(`${styleClasses.THUMB}`);

    this.saveDom(thumbHTML);

    return thumbHTML;
  }
}

export default Thumb;