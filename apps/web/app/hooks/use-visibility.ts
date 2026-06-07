import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => {
  document.addEventListener("visibilitychange", onStoreChange);

  return () => {
    document.removeEventListener("visibilitychange", onStoreChange);
  };
};

const getSnapshot = () => {
  return !document.hidden;
};

const getServerSnapshot = () => {
  return true;
};

export const useVisibility = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
