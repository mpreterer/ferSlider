import { TValueFrom } from './types';

 interface IValidSettings {
  minValue: number;
  maxValue: number;
  step: number;
  valueFrom: TValueFrom;
  valueTo: number;
  isRange: boolean;
  isTip: boolean;
  isBarRange: boolean;
  isVertical: boolean;
  isStep: boolean;
}

export default IValidSettings;