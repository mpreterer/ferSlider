import IValidSettings from '../interfaces/IValidSettings';
import { UpdateValues } from '../interfaces/types';

export type ObserverData = IValidSettings | UpdateValues;
export type FunctionSignature1 = ({...args}: UpdateValues) => void;
export type FunctionSignature2 = ({...args}: IValidSettings) => void;
export interface IObservers {
  event: string,
  fun: FunctionSignature1 | FunctionSignature2,
}