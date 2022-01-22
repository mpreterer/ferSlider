import { IModelSettings } from "../interfaces/IModelSettings";
import { TDOMParents, TUpdateThumb } from "../interfaces/types";
import { IModelEvents } from "../interfaces/IEvents";
import Controller from "../Controller/Controller";
import IValidSettings from "../interfaces/IValidSettings";

class ferSlider {
  private controller: Controller;

  get events(): IModelEvents {
    return this.controller.events;
  }

  get settings(): IValidSettings {
    return this.controller.settings;
  }

  constructor(domParent: TDOMParents, settings: IModelSettings) {
    this.controller = new Controller(domParent, settings as IValidSettings);
    this.init(settings);
  }

  public updateCurrentValue (thumb: TUpdateThumb) {
    this.controller.updateCurrentValue(thumb);
  }

  public updateSettings(settings: IModelSettings): void {
    this.controller.updateSettings(settings);
    this.init(settings);
  }
  
  private init(settings: IModelSettings) {
    const { hasSlide } = settings;

    if(hasSlide) {  
      this.controller.events.currentValueChanged.subscribe(hasSlide);
    }
  }
}

export default ferSlider;