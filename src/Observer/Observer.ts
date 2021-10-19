class Observer {
    private observers: any;

    constructor() {
        this.observers = [];
    }

    subscribe(fun: Function) {
        this.observers.push(fun);
    }

    unsubscribe(fun: Function) {
        this.observers = this.observers.filter((subscriber: Function) => subscriber !== fun);
    }

    broadcast(data: any) {
        this.observers.forEach((subscriber: Function) => {
        subscriber(data);
        });
    }
}
  
export default Observer;