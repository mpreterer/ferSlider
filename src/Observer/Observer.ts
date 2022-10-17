import IObserver, { ObserverData, IObservers } from './IObserver';
// type ObserverEvent = { type: string; data: unknown }
// type Narrow<T, K> = T extends { type: K } ? T : never;
// type EventCallback<T extends ObserverEvent, K> = (data: Narrow<T, K>['data']) => void;

class Observer implements IObserver {
  private observers: IObservers[];

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
}

export default Observer;
