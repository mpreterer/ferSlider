import InterfaceSliderSettings from './InterfaceSliderSettings';

class Model {
    constructor() {
    }
  
    // initData(options): Options {
    //   return options
    // }
  
    get template(): string {
      return `
      <div class="container_range">
          <div class="range range_horizontal" tip="on" condition="horizontal" bar="on" range="double" steps="1" maximum="5000" minimum="0" index="1">
              <div class="field_range" style="width:0%; left:0;"></div>
              <div class="valueTop valueTopLeft" style="left:25%;"></div>
              <div class="thumb thumbLeft" style="width:10px;
              height:18px; left:25%;"></div>
              <div class="valueTop valueTopRight" style="left:65%;"></div>
              <div class="thumb thumbRight" style="width:10px;
              height:18px; left:65%;"></div>
          </div>
          <div class="steps">
              <div class="startStep"></div>
              <div class="stepsIn" style="width:100%;"></div>
              <div class="endStep"></div>
          </div>
      </div>
      `
    }

    private validateNumber(value: InterfaceSliderSettings[keyof InterfaceSliderSettings]): number | null {
        const parsedValue = parseFloat(`${value}`);
        const isValueNaN = Number.isNaN(parsedValue);
        
        return !isValueNaN ? parsedValue : null;
    }

    private validateBoolean(value: InterfaceSliderSettings[keyof InterfaceSliderSettings]): boolean | null {
        return typeof value === 'boolean' ? value : null;
    }

    calcValueWithStep(value: number) {
        const { min, step } = this.getSettings();
        return Math.round((value - min) / step) * step + min;
    }
    
    private validateSetting(
        key:string,
        value: InterfaceSliderSettings[keyof InterfaceSliderSettings],
        newSettings: InterfaceSliderSettings = {}
    ) {
        const validatedFrom = this.validateNumber(newSettings.from);
        const validatedTo = this.validateNumber(newSettings.to);
        const validatedMin = this.validateNumber(newSettings.min);
        const validatedMax = this.validateNumber(newSettings.max);
        const validatedStep = this.validateNumber(newSettings.step);
        const validatedIsRange = this.validateBoolean(newSettings.isRange);

        const to = validatedTo !== null ? this.calcValueWithStep(validatedTo) : this.settings.to;
        const from = validatedFrom !== null ? this.calcValueWithStep(validatedFrom)
        : this.settings.from;
        const step = validatedStep !== null ? validatedStep : this.settings.step;
        const min = validatedMin !== null ? validatedMin : this.settings.min;
        const max = validatedMax !== null ? validatedMax : this.settings.max;
        const isRange = validatedIsRange !== null ? validatedIsRange : this.settings.isRange;

    export default Model;
  }