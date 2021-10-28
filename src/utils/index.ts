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
  