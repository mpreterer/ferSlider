import styleClasses from "../../styleClasses";

class Slider {
  constructor () {
    this.getHTML();
  }

  public saveDom (element: HTMLDivElement) {
    this.dom = element;
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  private getHTML () {
    const sliderHTML = document.createElement('div');
    sliderHTML.classList.add(`${styleClasses.SLIDER}`);

    this.saveDom(sliderHTML);
  }

  private dom: HTMLDivElement;
}

export default Slider;