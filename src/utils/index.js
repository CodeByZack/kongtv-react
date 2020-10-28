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

export const checkBrowser = () => {
  const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf('Opera') > -1) {
    return 'Opera';
  } //判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  } //判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } //判断是否Safari浏览器
  // if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
  //     return "IE";
  // }; //判断是否IE浏览器
};
