interface IObserver {
    subscribe: Function;
    unsubscribe: Function;
    broadcast: Function;
}
  
export default IObserver; 