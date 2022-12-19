import IValidSettings from '../interfaces/IValidSettings';
import { UpdateValues } from '../interfaces/types';

export type ObserverData = IValidSettings | UpdateValues;

export interface IObservers {
  event: string,
  fun: Function,
}