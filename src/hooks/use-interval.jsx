import { useEffect, useRef } from "react";

export function useInterval(callback, delay, ...callbackParams) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current(callbackParams);
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [callback, delay, callbackParams]);
}
