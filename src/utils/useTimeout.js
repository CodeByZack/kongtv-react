import { useEffect, useState } from 'react';

const useTimeout = (ms: number = 0) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [ms]);

  return ready;
};

export default useTimeout;
