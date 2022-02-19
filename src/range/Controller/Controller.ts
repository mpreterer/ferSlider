import { IModelSettings } from "../interfaces/IModelSettings";
import { TDOMParents, TUpdateThumb } from '../interfaces/types';
import { IEvents, IModelEvents } from "../interfaces/IEvents";
import { bind } from "decko";
import Observer from "../Observer/Observer";
import Model from "../Model/Model";
import View from "../View/View";
import IValidSettings from "../interfaces/IValidSettings";

class Controller extends Observer {

    private domParent: TDOMParents;
    private model: Model;
    private view: View;
    private _events: IModelEvents;

    get events (): IEvents {
        return {
          ...this.model.events,
          ...this.view.events,
        };
    }

    get settings(): IValidSettings {
        return this.model.settings;
    }

    constructor(domParent: TDOMParents, settings: IValidSettings) {
        super();
        
        this.domParent = domParent;
    
        // this.model = new Model(settings);
        // this.view = new View(this.domParent, this.model.settings);
        // this._events = {
        //     ...this.model.events,
        //     ...this.view.events
        // };
        this.domParent = domParent;
        this.model = new Model(settings);
        this.view = new View(this.domParent, this.model.settings);

        this.init();
    }

    public updateSettings(settings: IModelSettings):void {
        const newSettings = { ...this.model.settings, ...settings } as IValidSettings;
        this.model.updateModelSettings(newSettings);
    }

    public updateCurrentValue(thumb: TUpdateThumb): void {
        this.model.updateCurrentValueSettings(thumb);
      }

    private init() {
        this.subscribeToLayers();
        this.subscribeToEvents();
    }
    
    private subscribeToLayers() {
        this.model.subscribe(this.modelUpdate);
        this.view.subscribe(this.viewUpdate);
    }

    @bind
    private subscribeToEvents() {
        this.model.events.currentValueChanged.subscribe(this.updateViewFromModelEvents);
        this.view.events.slide.subscribe(this.updateModelFromViewEvents);
    }

    @bind
    private updateViewFromModelEvents(thumb: TUpdateThumb) {
        this.view.updateCurrentValue(thumb);
    }

    @bind
    private updateModelFromViewEvents(thumb: TUpdateThumb) {
        this.model.updateCurrentValue(thumb);
    }
    
    @bind
    private modelUpdate(modelSettings: IValidSettings) {
        this.view.updateModelSettings(modelSettings);
    }
    @bind
    private viewUpdate(modelSettings: IValidSettings) {
        this.model.updateModelSettings(modelSettings);
    }
}

export default Controller;