import { TValueFrom, TUpdateThumb } from './types';

export interface IModelSettings extends API  {
  minValue?: number;
  maxValue?: number;
  step?: number;
  valueFrom?: TValueFrom;
  valueTo?: number;
  isRange?: boolean;
  isTip?: boolean;
  isBarRange?: boolean;
  isVertical?: boolean;
  isStep?: boolean;
}

export interface API {
  hasSlide?: (callback: TUpdateThumb) => void;
  updateSettings?: (settingsToUpdate: Partial<IModelSettings>) => void;
}
