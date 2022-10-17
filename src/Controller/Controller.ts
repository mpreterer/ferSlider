import { bind } from 'decko';

// import { IExtendsEvents } from '../interfaces/IEvents';
import IModelSettings from '../interfaces/IModelSettings';
import IValidSettings from '../interfaces/IValidSettings';
import { TDOMParents, TUpdateThumb } from '../interfaces/types';
import Model from '../Model/Model';
import Observer from '../Observer/Observer';
import View from '../View/View';

class Controller extends Observer {
  private domParent: TDOMParents;

  private model: Model;

  private view: View;

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

  private init () {
    this.model.subscribe('updateSettings', this.handleModelUpdateOptions);
    this.model.subscribe('updateValues', this.handleModelUpdateValues);
    this.view.subscribe('onSlide', this.handleViewOnSlide);
  }

  get settings (): IValidSettings {
    return this.model.settings;
  }

  @bind
  private handleModelUpdateOptions (settings: IValidSettings) {
    this.view.updateSettings(settings);
    this.notify('updateSettings', settings);
  }

  @bind
  private handleModelUpdateValues (value: TUpdateThumb) {
    this.view.updateValues(value);
    this.notify('updateValues', value);
  }

  @bind
  private handleViewOnSlide (value: TUpdateThumb) {
    this.model.updateValues(value)
  }
}

export default Controller;
