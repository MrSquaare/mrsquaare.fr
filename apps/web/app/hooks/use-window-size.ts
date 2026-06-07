import { useSyncExternalStore } from "react";

type WindowSize = {
  width: number;
  height: number;
};

let cachedSize: WindowSize = {
  width: typeof window !== "undefined" ? window.innerWidth : 0,
  height: typeof window !== "undefined" ? window.innerHeight : 0,
};

const subscribe = (onStoreChange: () => void) => {
  const handleResize = () => {
    cachedSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    onStoreChange();
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
};

const getSnapshot = () => {
  return cachedSize;
};

const getServerSnapshot = () => {
  return { width: 0, height: 0 };
};

export const useWindowSize = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
