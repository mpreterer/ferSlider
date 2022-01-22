const timeout = (callback: Function) => {
    let setTime: number;
  
    return (argument: any) => {
      clearTimeout(setTime);
      setTime = setTimeout(callback, 500, argument);
    };
  };
  
  export default timeout;