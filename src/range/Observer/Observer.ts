import IObserver from './IObserver';

class Observer implements IObserver {
    private observers: any[];

    constructor() {
        this.observers = [];
    }

    subscribe(fun: Function) {
        this.observers.push(fun);
    }

    unsubscribe(fun: Function) {
        this.observers = this.observers.filter((subscriber: Function) => subscriber !== fun);
    }

    notify(data: any) {
        this.observers.forEach((subscriber: Function) => {
            subscriber(data);
        });
    }
}
  
export default Observer;