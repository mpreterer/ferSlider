import Controller from '../Controller/Controller';
import IModelSettings from '../interfaces/IModelSettings';
import IValidSettings from '../interfaces/IValidSettings';
import { TDOMParents, TUpdateThumb, SliderEvents } from '../interfaces/types';

class FerSlider {
  private controller: Controller;

  get settings (): IValidSettings {
    return this.controller.settings;
  }

  constructor (domParent: TDOMParents, settings: IModelSettings) {
    this.controller = new Controller(domParent, settings as IValidSettings);
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
}

export default FerSlider;