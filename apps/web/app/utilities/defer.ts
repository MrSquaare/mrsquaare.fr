export const deferSet = <T>(
  setter: (value: T) => void,
  value: T,
): (() => void) => {
  let active = true;

  Promise.resolve().then(() => {
    if (active) {
      setter(value);
    }
  });

  return () => {
    active = false;
  };
};

export const deferDestroy = (
  target: { destroyed: boolean; destroy: (destroyBase?: boolean) => void },
  destroyBase = true,
): void => {
  setTimeout(() => {
    if (!target.destroyed) {
      target.destroy(destroyBase);
    }
  }, 0);
};
