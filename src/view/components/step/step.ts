import styleClasses from "../../styleClasses";

class Steps {
  constructor () {

  }

  public getHtml ():ChildNode {
    const htmlDOM = document.createElement('ul');
    htmlDOM.classList.add(`${styleClasses.STEP}`);

    const step = document.createElement('li');
    step.classList.add(`${styleClasses.STEP_ITEM}`);

    htmlDOM.appendChild(step)

    return htmlDOM
  }
}

export default Steps