import Controller from './Controller/Controller';
import IModelSettings from './interfaces/IModelSettings';
import IValidSettings from './interfaces/IValidSettings';
import { SliderEvents, TDOMParents, TUpdateThumb } from './interfaces/types';

class FerSlider {
  constructor (domParent: TDOMParents, settings: IValidSettings) {
    this.controller = new Controller(domParent, settings);
  }

  public updateValues (thumb: TUpdateThumb) {
    this.controller.updateValues(thumb);
  }

  public updateSettings (settings: IModelSettings): void {
    this.controller.updateSettings(settings);
  }

  public subscribe (event: SliderEvents, fun: Function): void {
    this.controller.subscribe(event, fun);
  }

  public unsubscribe (event: SliderEvents, fun: Function): void {
    this.controller.unsubscribe(event, fun);
  }

  private controller: Controller;

  get settings (): IValidSettings {
    return this.controller.settings;
  }
}

export default FerSlider;