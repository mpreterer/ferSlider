import IObserver, { IObservers, ObserverData } from './IObserver';

class Observer implements IObserver {
  constructor () {
    this.observers = [];
  }

  public subscribe (event: string, fun: Function) {
    this.observers.push({ event, fun });
  }

  public unsubscribe (event: string, fun: Function) {
    this.observers = this.observers.filter((item) => {
      const current = item.fun === fun && item.event === event;

      if (!current) return true;
      return false;
    });
  }

  public notify (event: string, data: ObserverData) {
    this.observers.forEach((subscriber) => {
      if (subscriber.event === event) {
        subscriber.fun(data);
      }
    });
  }

  private observers: IObservers[];
}

export default Observer;
