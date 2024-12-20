import { useEffect, useRef, useState } from "react";

export function useDebounced(value, timeout) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [value, timeout]);

  return debouncedValue;
}

export function useThrottled(value, timeout) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = () => {
      if (Date.now() - lastRan.current >= timeout) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    };

    const interval = setInterval(handler, timeout);
    return () => clearInterval(interval);
  }, [value, timeout]);

  return throttledValue;
}
