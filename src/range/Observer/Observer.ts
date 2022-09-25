import IObserver from "./IObserver";

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
