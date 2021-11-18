import styleClasses from "../../styleClasses";

class Thumb {
  constructor () {
  }

  public getHtml():ChildNode {
    const htmlDOM = document.createElement('div');
    htmlDOM.classList.add(`${styleClasses.THUMB}`);
    htmlDOM.innerHTML = '1';

    return htmlDOM
  }
}

export default Thumb 