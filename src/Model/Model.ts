import IValidSettings from '../interfaces/IValidSettings';
import { TUpdateThumb } from '../interfaces/types';
import Observer from '../Observer/Observer';
import defaultSettings from './defaultSettings';

class Model extends Observer {
  private modelSettings: IValidSettings;

  get settings (): IValidSettings {
    return this.modelSettings;
  }

  constructor (settings: IValidSettings) {
    super();
    const validSettings = {
      ...{},
      ...defaultSettings,
      ...settings,
    };

    this.modelSettings = validSettings;
    this.validModelSettings(validSettings);
  }

  public getModelSettings (): IValidSettings {
    return this.modelSettings;
  }

  public updateSettings (settings: IValidSettings): void {
    if (Model.checkNewSettings(settings)) {
      this.modelSettings = settings;
      this.validModelSettings(settings);
    }
  }

  public updateValues (thumb: TUpdateThumb): void {
    const {
      minValue,
      maxValue,
      isRange,
      valueFrom,
      valueTo,
      step,
    } = this.modelSettings;
    const bodyThumb = thumb;

    const isFrom = bodyThumb.handle === "valueFrom"
      && isRange;
    const isTo = bodyThumb.handle === "valueTo"
      && isRange;
    const valueWithStep = Model.getValueWithStep(bodyThumb.value, minValue, step);

    const validValueWithStep = Model.getDiapason(
      valueWithStep,
      minValue,
      maxValue,
    );

    if (isFrom) {
      const val = Model.getDiapason(
        validValueWithStep,
        minValue,
        valueTo,
      );
      this.modelSettings.valueFrom = val;
      this.modelSettings.valueTo = valueTo;
      bodyThumb.value = val;

      this.notify('updateValues',
        {
          handle: 'valueFrom',
          value: val,
        });
      this.notify('updateValues',
        {
          handle: 'valueTo',
          value: valueTo,
        });
    }

    if (isTo) {
      const val = Model.getDiapason(
        validValueWithStep,
        valueFrom,
        maxValue,
      );
      this.modelSettings.valueFrom = valueFrom;
      this.modelSettings.valueTo = val;

      bodyThumb.value = val;
      this.notify('updateValues',
        {
          handle: 'valueFrom',
          value: valueFrom,
        });
      this.notify('updateValues',
        {
          handle: 'valueTo',
          value: val,
        });
    }

    if (!isRange) {
      this.modelSettings.valueFrom = validValueWithStep;
      bodyThumb.value = validValueWithStep;

      this.notify('updateValues',
        {
          handle: 'valueFrom',
          value: validValueWithStep,
        });
    }
  }

  static getValidStep (
    minValue: number,
    maxValue: number,
    step: number,
  ): number {
    const maxStep = maxValue - minValue;

    if (step > maxValue) return maxStep;
    if (step <= 0) return maxStep;

    return step;
  }

  static getDiapason (
    value: number,
    minValue: number,
    maxValue: number,
  ): number {
    if (value <= minValue) {
      return minValue;
    }
    if (value >= maxValue) {
      return maxValue;
    }
    return value;
  }

  static getValueWithStep (value: number, minValue: number, step: number) {
    const valueWithStep = Math.round((value - minValue) / step) * step + minValue;
    return valueWithStep;
  }

  static getMiddleValue (
    minValue: number,
    maxValue: number,
  ): { minValue: number; maxValue: number } {
    const checkValue = minValue > maxValue ? maxValue : minValue;

    return { minValue: checkValue, maxValue };
  }

  static checkNewSettings (settings: IValidSettings): boolean {
    let validValueTo = false;
    if (settings.valueTo) validValueTo = Number.isNaN(settings.valueTo);
    const validValueFrom = Number.isNaN(settings.valueFrom);
    const validMinValue = Number.isNaN(settings.minValue);
    const validMaxValue = Number.isNaN(settings.maxValue);
    const validStep = Number.isNaN(settings.step);

    const validNewSettings = !validMinValue
    && !validMaxValue
    && !validStep
    && !validValueFrom
    && !validValueTo

    return validNewSettings;
  }

  private validModelSettings (settings: IValidSettings) {
    const {
      valueFrom,
      valueTo,
      minValue,
      maxValue,
      step,
    } = settings;

    const validatedMiddle = Model.getMiddleValue(minValue, maxValue);
    const hasSettings = settings !== undefined && settings !== null;

    this.modelSettings.minValue = validatedMiddle.minValue;
    this.modelSettings.maxValue = validatedMiddle.maxValue;
    this.getValidCurrentValue(valueFrom, valueTo);
    this.modelSettings.step = Model.getValidStep(minValue, maxValue, step);

    if (hasSettings) {
      this.notify('updateSettings', this.modelSettings);
    }
  }

  private getValidCurrentValue (valueFrom: number, valueTo: number) {
    const { minValue, maxValue, isRange } = this.modelSettings;

    if (isRange) {
      const res = Model.getMiddleValue(valueFrom, valueTo);

      this.modelSettings.valueFrom = Model.getDiapason(res.minValue, minValue, maxValue)
      this.modelSettings.valueTo = Model.getDiapason(res.maxValue, minValue, maxValue);
    } else {
      const confirmedCurrentValue = Model.getDiapason(
        valueFrom,
        minValue,
        maxValue,
      );

      this.modelSettings.valueFrom = confirmedCurrentValue
    }
  }
}

export default Model;
