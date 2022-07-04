const timeout = (callback: Function) => {
    let timeout: number;
  
    return (arg: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, 800, arg);
    };
  };
  
  export default timeout;
  