export const animInterval = (callback: () => any, delay: number) => {
  const dateNow = Date.now;
  const requestAnimation = window.requestAnimationFrame;
  let start: number = dateNow();
  let stop: number;
  const intervalFunc = () => {
    dateNow() - start < delay || ((start += delay), callback());
    stop || requestAnimation(intervalFunc);
  };
  requestAnimation(intervalFunc);
  return {
    clear: () => {
      stop = 1;
    }
  };
};
