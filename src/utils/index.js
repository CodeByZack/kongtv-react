export const throttle = (func, wait) => {
  let previous = 0;
  return function() {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
};

export const getQuery = str => {
  const queryStr = str.split('?')[1];
  const arr = queryStr.split('&');
  const obj = arr.reduce((acc, now) => {
    const [k, v] = now.split('=');
    acc[k] = decodeURIComponent(v);
    return acc;
  }, {});
  return obj;
};