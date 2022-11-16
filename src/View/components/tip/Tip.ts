import styleClasses from '../../styleClasses';

class Tip {
  public saveDom (element: HTMLDivElement) {
    this.dom = element;
  }

  public getDom (): HTMLDivElement {
    return this.dom;
  }

  public getHTML (): HTMLDivElement {
    const tipHTML = document.createElement('div');
    tipHTML.classList.add(`${styleClasses.TIP}`);

    this.saveDom(tipHTML);

    return tipHTML;
  }

  private dom: HTMLDivElement;
}

export default Tip;
