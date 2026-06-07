import { type FC, type ReactNode } from "react";

import { useHydrated } from "../../hooks/use-hydrated";

type ClientOnlyProps = {
  children: () => ReactNode;
  fallback?: ReactNode;
};

export const ClientOnly: FC<ClientOnlyProps> = ({
  children,
  fallback = null,
}) => {
  const hydrated = useHydrated();

  return hydrated ? <>{children()}</> : <>{fallback}</>;
};
