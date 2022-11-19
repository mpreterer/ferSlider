import { IObservers, ObserverData } from './IObserver';

class Observer {
  constructor () {
    this.observers = [];
  }

  public subscribe (event: string, fun: Function): void {
    this.observers.push({ event, fun });
  }

  public unsubscribe (event: string, fun: Function): void {
    this.observers = this.observers.filter((item) => {
      const current = item.fun === fun && item.event === event;

      if (!current) return true;
      return false;
    });
  }

  public notify (event: string, data: ObserverData): void {
    this.observers.forEach((subscriber) => {
      if (subscriber.event === event) {
        subscriber.fun(data);
      }
    });
  }

  private observers: IObservers[];
}

export default Observer;
