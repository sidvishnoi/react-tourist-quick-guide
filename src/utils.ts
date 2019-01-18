export function debounce(fn: Function, delay: number) {
  let timer: any; // https://stackoverflow.com/q/45802988
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}
