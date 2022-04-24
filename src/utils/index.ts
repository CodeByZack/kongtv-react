export const getQuery = (str: string) => {
  const queryStr = str.split('?')[1];
  const arr = queryStr.split('&');
  const obj = arr.reduce<{ [x: string]: any }>((acc, now) => {
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

export const checkIsMobile = () => {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    // alert('手机端')
    return true;
  } else {
    // alert('PC端')
    return false;
  }
};
