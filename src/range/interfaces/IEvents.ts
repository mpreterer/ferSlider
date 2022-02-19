import IObserver from '../Observer/IObserver';
  
export interface IModelEvents {
    currentValueChanged: IObserver,
    modelChangedSettings: IObserver
}

export interface IEvents {
    slide: IObserver;
}

export interface IExtendsEvents extends IEvents, IModelEvents {}