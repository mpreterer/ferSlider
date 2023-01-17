import Controller from './Controller/Controller';
import IModelSettings from './interfaces/IModelSettings';
import IValidSettings from './interfaces/IValidSettings';
import { SliderEvents, TDOMParents, TUpdateThumb } from './interfaces/types';
import { FunctionSignature1, FunctionSignature2 } from './Observer/IObserver';

class FerSlider {
  constructor (domParent: TDOMParents, settings: IModelSettings) {
    this.controller = new Controller(domParent, settings as IValidSettings);
  }

  public updateValues (thumb: TUpdateThumb) {
    this.controller.updateValues(thumb);
  }

  public updateSettings (settings: IModelSettings): void {
    this.controller.updateSettings(settings);
  }

  public subscribe (event: SliderEvents, fun: FunctionSignature1 | FunctionSignature2): void {
    this.controller.subscribe(event, fun);
  }

  public unsubscribe (event: SliderEvents, fun: FunctionSignature1 | FunctionSignature2): void {
    this.controller.unsubscribe(event, fun);
  }

  private controller: Controller;

  get settings (): IValidSettings {
    return this.controller.settings;
  }
}

export default FerSlider;