import { useRef } from "react";

export default function useDebounce(backend: () => void) {
  const time = useRef<any>();
  const fn = () => {
    clearInterval(time.current);
    time.current = setTimeout(backend, 1000);
  };
  return fn;
}
