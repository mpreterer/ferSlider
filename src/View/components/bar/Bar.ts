import styleClasses from '../../styleClasses';

class Bar {
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
    const htmlBar = document.createElement('div');
    htmlBar.classList.add(`${styleClasses.BAR}`);

    this.saveDom(htmlBar);
  }

  private dom: HTMLDivElement;
}

export default Bar;