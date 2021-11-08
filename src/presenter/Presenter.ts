import IModelOptions from "../interfaces/IModelOptions";

import Observer from "../Observer/Observer";
import Model from "../Model/Model";
import View from "../View/View";

class Presenter extends Observer {
    private sliderSettings: IModelOptions;
    private domParent: HTMLDivElement;

    private model: Model;
    private view: View;

    constructor(domParent: HTMLDivElement, sliderSettings: IModelOptions) {
        super();
    
        this.domParent = domParent;
        this.sliderSettings = sliderSettings;
    
        this.model = new Model(this.sliderSettings);
        this.view = new View(this.domParent, this.sliderSettings);
      }
    
    private subscribeToModel () {
        this.model.subscribe(this.onModelUpdate);
        this.view.subscribe(this.onViewUpdate);
    }

    public updateModelSettings(newModelSettings: IModelSettings) {
        this.sliderSettings = newModelSettings;
    }

    private onModelUpdate (modelSettings: IModelOptions) {
        this.view.updateModelSettings(modelSettings);
        this.updateModelSettings(modelSettings);
    }

    private onViewUpdate(modelSettings: IModelOptions) {
        this.model.updateModelOptions(modelSettings);
    }
}

export default Presenter;