import { FunctionSignature1, FunctionSignature2, IObservers } from './IObserver';

class Observer {
  constructor () {
    this.observers = [];
  }

  public subscribe (event: string, fun: FunctionSignature1 | FunctionSignature2): void {
    this.observers.push({ event, fun });
  }

  public unsubscribe (event: string, fun: FunctionSignature1 | FunctionSignature2): void {
    this.observers = this.observers.filter((item) => {
      const current = item.fun === fun && item.event === event;

      if (!current) return true;
      return false;
    });
  }
  // тут было IValidSettings | UpdateValues Нужно заменить any
  public notify (event: string, data: any): void {
    console.log(data)
    this.observers.forEach((subscriber) => {
      if (subscriber.event === event) {
        subscriber.fun(data);
      }
    });
  }

  private observers: IObservers[];
}

export default Observer;
