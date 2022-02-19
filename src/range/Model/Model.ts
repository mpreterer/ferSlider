import Observer from '../Observer/Observer';
import IValidSettings from '../interfaces/IValidSettings';
import { TValueFrom, TUpdateThumb } from '../interfaces/types';
import { IModelEvents } from '../interfaces/IEvents';

class Model extends Observer {
    private modelSettings: IValidSettings;

    constructor(settings: IValidSettings) {
      super();

      this.modelSettings = settings;
      this.validModelSettings(settings);
    }
    
    get settings(): IValidSettings {
      return this.modelSettings
    }

    get events(): IModelEvents {
      return this.modelEvents;
    };

    private modelEvents: IModelEvents = {
      currentValueChanged: new Observer(),
      modelChangedSettings: new Observer(),
    };
    
    public getModelSettings(): IValidSettings {
        return this.modelSettings;
    }

    public updateModelSettings(settings: IValidSettings): void {
      this.modelSettings = settings;
      this.validModelSettings(settings);

      this.notify(this.modelSettings);
    }

    public updateCurrentValueSettings(thumb: TUpdateThumb): void {
      const { minValue, maxValue, isRange, valueFrom, step } = this.modelSettings;
      const isFrom = thumb.handle === 'thumbLeft';
      const isTo = thumb.handle === 'thumbRight';
      const hasStep = thumb.valueFromStep;
      const valueWithStep = hasStep ? this.getValueWithStep(thumb.value, minValue, step) : thumb.value;
      const validValueWithStep = this.getDiapason(valueWithStep, minValue, maxValue);

      if(isRange) {
        if(typeof valueFrom === 'object') {
          if(isFrom) {
            thumb.value = this.getDiapason(validValueWithStep, minValue, valueFrom.maxValue);
            this.modelSettings.valueFrom = { minValue: thumb.value, maxValue: valueFrom.maxValue };
          }
          if(isTo) {
            thumb.value = this.getDiapason(validValueWithStep, valueFrom.minValue, maxValue);
            valueFrom.maxValue = thumb.value;
            this.modelSettings.valueFrom = { minValue: valueFrom.minValue, maxValue: thumb.value };
          }
        }
      }

      this.modelSettings.valueFrom = validValueWithStep;
      thumb.value = validValueWithStep;
      
      this.modelEvents.currentValueChanged.notify(thumb);
    }
    
    private validModelSettings(settings: IValidSettings) {
      const { valueFrom, minValue, maxValue, isRange, step } = settings;
      const validatedMiddle = this.getMiddleValue(minValue, maxValue);
  
      this.modelSettings.minValue = validatedMiddle.minValue;
      this.modelSettings.maxValue = validatedMiddle.maxValue;
      this.modelSettings.valueFrom = this.getValidCurrentValue(valueFrom);
      this.modelSettings.step = this.getValidStep(minValue, maxValue, step);
    }

    private getValidStep(minValue: number, maxValue: number, step: number): number {
      const maxStep = maxValue - minValue;
  
      if(step >= maxValue && maxStep > 0) return maxStep;
      if(step <= 0) return maxStep;
  
      return step;
    }

    private getDiapason(value: number, minValue: number, maxValue: number): number {
      if (value <= minValue) { return minValue; }
      if (value >= maxValue) { return maxValue; }
      return value;
    }
  
    private getValueWithStep(value: number, minValue: number, step: number) {
      const valueWithStep = Math.round((value - minValue) / step) * step + minValue;

      return valueWithStep;
    }
  
    private getMiddleValue(minValue: number, maxValue: number): { minValue: number, maxValue: number } {
      const checkValue = minValue > maxValue ? maxValue : minValue;
  
      return { minValue: checkValue, maxValue: maxValue };
    }

    private getValidCurrentValue(valueFrom: TValueFrom): TValueFrom {
      const { minValue, maxValue, isRange } = this.modelSettings;

      if(typeof valueFrom === 'object') {
          
        if(isRange) {
          valueFrom = this.getMiddleValue(valueFrom.minValue, valueFrom.maxValue);

          return {
            minValue: this.getDiapason(valueFrom.minValue, minValue, maxValue),
            maxValue: this.getDiapason(valueFrom.maxValue, minValue, maxValue)
          }
        }

        return this.getDiapason(valueFrom.minValue, minValue, maxValue);
      }
      
      if(typeof valueFrom === 'number') {
       
        const confirmedCurrentValue = this.getDiapason(valueFrom, minValue, maxValue);

        if(isRange) {
          return {
            minValue: confirmedCurrentValue,
            maxValue: confirmedCurrentValue
          }
        }
        return confirmedCurrentValue;
      }
  
        return (maxValue - minValue) / 2;
    }

    public updateCurrentValue(thumb: TUpdateThumb) {
        this.notify(thumb);
    }
  }

export default Model;