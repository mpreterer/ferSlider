import IModelOptions from "../../../interfaces/IModelOptions";
import Presenter from "../../../Presenter/Presenter";

class ferSlider {

  private options: IModelOptions;
  private domParent: HTMLDivElement;

  constructor (domParent: HTMLDivElement, options: IModelOptions) {
    this.domParent = domParent
    this.options = options;
    this.init();
  }

  private init() {
    const presenter = new Presenter(this.domParent, this.options)
  }

}

export default ferSlider; 