import styleClasses from "../../styleClasses";

class Slider {
  private dom: HTMLDivElement;

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
}

export default Slider;