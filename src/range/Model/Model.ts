import Observer from "../Observer/Observer";
import IValidSettings from "../interfaces/IValidSettings";
import { TValueFrom, TUpdateThumb } from "../interfaces/types";
import { IModelEvents } from "../interfaces/IEvents";

class Model extends Observer {
  private modelSettings: IValidSettings;

  constructor (settings: IValidSettings) {
    super();

    this.modelSettings = settings;
    this.validModelSettings(settings);
  }

  get settings (): IValidSettings {
    return this.modelSettings;
  }

  get events (): IModelEvents {
    return this.modelEvents;
  }

  private modelEvents: IModelEvents = {
    currentValueChanged: new Observer(),
    modelChangedSettings: new Observer(),
  };

  public getModelSettings (): IValidSettings {
    return this.modelSettings;
  }

  public updateModelSettings (settings: IValidSettings): void {
    this.modelSettings = settings;
    this.validModelSettings(settings);

    this.notify(this.modelSettings);
  }

  public updateCurrentValueSettings (thumb: TUpdateThumb): void {
    const {
      minValue,
      maxValue,
      isRange,
      valueFrom,
      step,
    } = this.modelSettings;
    const bodyThumb = thumb;
    const isFrom = bodyThumb.handle === "thumbLeft";
    const isTo = bodyThumb.handle === "thumbRight";
    const hasStep = bodyThumb.valueFromStep;
    const valueWithStep = hasStep
      ? Model.getValueWithStep(bodyThumb.value, minValue, step)
      : bodyThumb.value;
    const validValueWithStep = Model.getDiapason(
      valueWithStep,
      minValue,
      maxValue,
    );

    if (isRange) {
      if (typeof valueFrom === "object") {
        if (isFrom) {
          const val = Model.getDiapason(
            validValueWithStep,
            minValue,
            valueFrom.maxValue,
          );
          this.modelSettings.valueFrom = {
            minValue: val,
            maxValue: valueFrom.maxValue,
          };
          bodyThumb.value = val;
        }
        if (isTo) {
          const val = Model.getDiapason(
            validValueWithStep,
            valueFrom.minValue,
            maxValue,
          );
          this.modelSettings.valueFrom = {
            minValue: valueFrom.minValue,
            maxValue: val,
          };
          bodyThumb.value = val;
        }
      }
    }

    if (!isRange) {
      this.modelSettings.valueFrom = validValueWithStep;
      bodyThumb.value = validValueWithStep;
    }

    this.modelEvents.currentValueChanged.notify(bodyThumb);
  }

  private validModelSettings (settings: IValidSettings) {
    const {
      valueFrom,
      minValue,
      maxValue,
      step,
    } = settings;
    const validatedMiddle = Model.getMiddleValue(minValue, maxValue);

    this.modelSettings.minValue = validatedMiddle.minValue;
    this.modelSettings.maxValue = validatedMiddle.maxValue;
    this.modelSettings.valueFrom = this.getValidCurrentValue(valueFrom);
    this.modelSettings.step = Model.getValidStep(minValue, maxValue, step);
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
    const valueWithStep = Math.round((
      (value - minValue) / step)
      * step + minValue);

    return valueWithStep;
  }

  static getMiddleValue (
    minValue: number,
    maxValue: number,
  ): { minValue: number; maxValue: number } {
    const checkValue = minValue > maxValue ? maxValue : minValue;

    return { minValue: checkValue, maxValue };
  }

  private getValidCurrentValue (valueFrom: TValueFrom): TValueFrom {
    const { minValue, maxValue, isRange } = this.modelSettings;

    if (typeof valueFrom === "object") {
      if (isRange) {
        const res = Model.getMiddleValue(valueFrom.minValue, valueFrom.maxValue);

        return {
          minValue: Model.getDiapason(res.minValue, minValue, maxValue),
          maxValue: Model.getDiapason(res.maxValue, minValue, maxValue),
        };
      }

      return Model.getDiapason(valueFrom.minValue, minValue, maxValue);
    }

    if (typeof valueFrom === "number") {
      const confirmedCurrentValue = Model.getDiapason(
        valueFrom,
        minValue,
        maxValue,
      );

      if (isRange) {
        return {
          minValue: confirmedCurrentValue,
          maxValue: confirmedCurrentValue,
        };
      }
      return confirmedCurrentValue;
    }

    return (maxValue - minValue) / 2;
  }
}

export default Model;
