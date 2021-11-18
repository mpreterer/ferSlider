import Observer from '../Observer/Observer';
import IModelOptions from '../interfaces/IModelOptions';

class Model extends Observer {
    private modelSettings: IModelOptions;

    constructor(modelSettings: IModelOptions) {
        super();

        this.modelSettings = this.validModelSettings(modelSettings);
    }

    public getModelOptions () {
        return this.modelSettings;
    }
    // IModelOptions вместо any
    private validModelSettings(validModelSettings: IModelOptions): any {
        const validatedModelSettings = validModelSettings;
    }

    public updateModelOptions(newModelSettings: IModelOptions) {
        this.modelSettings = this.validModelSettings(newModelSettings);
        this.notify(this.modelSettings);
    }
  
    get template(): string {
      return `
      <div class="container_range">
          <div class="range range_horizontal" tip="on" condition="horizontal" bar="on" range="double" steps="1" maximum="5000" minimum="0" index="1">
              <div class="field_range"></div>
              <div class="valueTop valueTopLeft"></div>
              <div class="thumb thumbLeft"></div>
              <div class="valueTop valueTopRight"></div>
              <div class="thumb thumbRight"></div>
          </div>
          <div class="steps">
              <div class="startStep"></div>
              <div class="stepsIn"></div>
              <div class="endStep"></div>
          </div>
      </div>
      `
    }
  }

export default Model;