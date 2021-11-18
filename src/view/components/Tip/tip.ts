import styleClasses from "../../styleClasses";

class Tip {
    constructor() {

    }

    public getHTML():ChildNode {
        const htmlDOM = document.createElement('div');
        htmlDOM.classList.add(`${styleClasses.TIP}`);
    
        return htmlDOM
      }
}

export default Tip;