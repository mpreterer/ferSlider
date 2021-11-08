import Observer from '../Observer/Observer';
import IModelOptions from '../interfaces/IModelOptions';

class Model extends Observer {
    private defaultSettings: IModelOptions;

    constructor(defaultSetting: IModelOptions) {
        super();

        this.defaultSettings = this.validDefaultSetting(defaultSetting);
    }

    public getModelOptions () {
        return this.defaultSettings;
    }

    private validDefaultSetting (validDefaultSetting: IModelOptions): IModelOptions {
        const validatedDefaultSetting = validDefaultSetting;
    }

    public updateModelOptions(newDefaultSettings: IModelOptions) {
        this.defaultSettings = this.validDefaultSetting(newDefaultSettings);
        this.broadcast(this.defaultSettings);
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