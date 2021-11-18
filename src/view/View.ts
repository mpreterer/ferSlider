// import { optionsParentDOM, updateOutputValue, valueOutput} from "../utils/types/namespace.ts";
import Observer from "../Observer/Observer";
import IModelOptions from "../interfaces/IModelOptions";
import styleClasses from "./styleClasses";

import Thumb from "./components/thumb/thumb";
import Bar from "./components/bar/bar";
import Step from "./components/step/step";
import Tip from "./components/Tip/tip";


class View extends Observer {
  private modelOptions: IModelOptions;
  private domParent: HTMLDivElement;

  private bar: Bar;
  private thumb: Thumb;
  private step: Step;
  private tip: Tip;

  constructor (domParent: HTMLDivElement, modelOptions: IModelOptions) {
    super();

    this.domParent = domParent;
    this.modelOptions = modelOptions;
    this.render();
  }

  public updateModelOptions(newModelOptions: IModelOptions) {
    this.modelOptions = newModelOptions;
  }

  private render () {
    this.initViewComponents();
    this.createSlider();
  }

  private initViewComponents () {
    
    this.bar = new Bar();
    this.thumb = new Thumb();

  }

  private createSlider () {
    const templateSlider = document.createElement('div');
    templateSlider.classList.add(`${styleClasses.SLIDER}`);

    const tplBar = templateSlider.appendChild(this.bar.getHtml());
    const tplThumb = templateSlider.appendChild(this.thumb.getHtml());

    tplThumb.appendChild(this.thumb.getHtml());

    this.domParent.appendChild(templateSlider);
  }
  }

  export default View;