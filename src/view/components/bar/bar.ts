import styleClasses from "../../styleClasses";

class Bar {

  constructor () {

  }

  public getHtml ():ChildNode {
    const htmlDOM = document.createElement('div');
    htmlDOM.classList.add(`${styleClasses.BAR}`);

    return htmlDOM
  }
}

export default Bar 