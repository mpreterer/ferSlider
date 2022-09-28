import Controller from '../Controller/Controller';
import { IExtendsEvents } from '../interfaces/IEvents';
import IModelSettings from '../interfaces/IModelSettings';
import IValidSettings from '../interfaces/IValidSettings';
import { TDOMParents, TUpdateThumb } from '../interfaces/types';

class FerSlider {
  private controller: Controller;

  get events (): IExtendsEvents {
    return this.controller.events;
  }

  get settings (): IValidSettings {
    return this.controller.settings;
  }

  constructor (domParent: TDOMParents, settings: IModelSettings) {
    this.controller = new Controller(domParent, settings as IValidSettings);
    this.init(settings);
  }

  public updateCurrentValue (thumb: TUpdateThumb) {
    this.controller.updateCurrentValue(thumb);
  }

  public updateSettings (settings: IModelSettings): void {
    this.controller.updateSettings(settings);
    this.init(settings);
  }

  private init (settings: IModelSettings) {
    const { hasSlide } = settings;

    if (hasSlide) {
      this.controller.events.currentValueChanged.subscribe(hasSlide);
    }
  }
}

export default FerSlider;