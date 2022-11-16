import IValidSettings from '../interfaces/IValidSettings';
import { UpdateValues } from '../interfaces/types';

export type ObserverData = IValidSettings | UpdateValues;

export interface IObservers {
  event: string,
  fun: Function,
}
interface IObserver {
  subscribe: (event: string, fun: Function) => void;
  unsubscribe: (event: string, fun: Function) => void;
  notify: (event: string, data: ObserverData) => void;
}

export default IObserver;