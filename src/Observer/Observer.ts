import IObserver from "./IObserver";
// type ObserverEvent = { type: string; data: unknown }
// type Narrow<T, K> = T extends { type: K } ? T : never;
// type EventCallback<T extends ObserverEvent, K> = (data: Narrow<T, K>['data']) => void;

class Observer implements IObserver {
  private observers: Function[];

  constructor () {
    this.observers = [];
  }

  public subscribe (fun: Function) {
    this.observers.push(fun);
  }

  public unsubscribe (fun: Function) {
    this.observers = this.observers.filter(
      (subscriber: Function) => subscriber !== fun,
    );
  }

  public notify (data: Object) {
    this.observers.forEach((subscriber: Function) => {
      subscriber(data);
    });
  }
}

export default Observer;
