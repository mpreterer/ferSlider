import { bind } from 'decko';

import { IExtendsEvents } from '../interfaces/IEvents';
import IModelSettings from '../interfaces/IModelSettings';
import IValidSettings from '../interfaces/IValidSettings';
import { TDOMParents, TUpdateThumb } from '../interfaces/types';
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
    this.model.updateModelSettings(newSettings);
  }

  public updateCurrentValue (thumb: TUpdateThumb): void {
    this.model.updateCurrentValueSettings(thumb);
  }

  private init () {
    this.subscribeToLayers();
    this.subscribeToEvents();
  }

  get events (): IExtendsEvents {
    return {
      ...this.model.events,
      ...this.view.events,
    };
  }

  get settings (): IValidSettings {
    return this.model.settings;
  }

  private domParent: TDOMParents;

  private model: Model;

  private view: View;

  private subscribeToLayers () {
    this.model.subscribe(this.modelUpdate);
  }

  private subscribeToEvents () {
    this.model.events.currentValueChanged.subscribe(
      this.updateViewFromModelEvents,
    );
    this.view.events.slide.subscribe(this.updateModelFromViewEvents);
  }

  @bind
  private updateViewFromModelEvents (thumb: TUpdateThumb) {
    this.view.updateCurrentValue(thumb);
  }

  @bind
  private updateModelFromViewEvents (thumb: TUpdateThumb) {
    this.model.updateCurrentValueSettings(thumb);
  }

  @bind
  private modelUpdate (modelSettings: IValidSettings) {
    this.view.updateModelSettings(modelSettings);
    this.model.events.modelChangedSettings.notify(modelSettings);
  }
}

export default Controller;
