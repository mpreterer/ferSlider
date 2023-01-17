import { bind } from 'decko';

import IModelSettings from '../interfaces/IModelSettings';
import IValidSettings from '../interfaces/IValidSettings';
import { EventList, TDOMParents, TUpdateThumb } from '../interfaces/types';
import Model from '../Model/Model';
import Observer from '../Observer/Observer';
import View from '../View/View';

class Controller extends Observer {
  constructor (domParent: TDOMParents, settings: IValidSettings) {
    super();

    this.domParent = domParent;
    this.model = new Model(settings);
    this.view = new View(this.domParent, this.model.settings);

    this.init();
  }

  public updateSettings (settings: IModelSettings) {
    const newSettings = { ...this.model.settings, ...settings };
    this.model.updateSettings(newSettings);
  }

  public updateValues (thumb: TUpdateThumb): void {
    this.model.updateValues(thumb);
  }

  private domParent: TDOMParents;

  private model: Model;

  private view: View;

  private init () {
    this.model.subscribe(EventList.updateSettings, this.handleModelUpdateOptions);
    this.model.subscribe(EventList.updateValues, this.handleModelUpdateValues);
    this.view.subscribe(EventList.slide, this.handleViewSlide);
  }

  get settings (): IValidSettings {
    return this.model.settings;
  }

  @bind
  private handleModelUpdateOptions (settings: IValidSettings) {
    this.view.updateSettings(settings);
    this.notify(EventList.updateSettings, settings);
  }

  @bind
  private handleModelUpdateValues (value: TUpdateThumb) {
    this.view.updateValues(value);
    this.notify(EventList.updateValues, value);
  }

  @bind
  private handleViewSlide (value: TUpdateThumb) {
    this.model.updateValues(value);
  }
}

export default Controller;
