import { ReactNode } from "react";

import { LanguageType } from "./types/i18n";

/// <reference path="next/navigation" />

declare module "next/navigation" {
  interface Params {
    lng: LanguageType;
    [key: string]: string | string[];
  }

  interface SearchParams {
    [key: string]: string | string[] | undefined;
  }

  interface LayoutProps {
    children: ReactNode;
  }

  interface MetadataProps<
    TParams extends Params = Params,
    TSearchParams extends SearchParams | never = never,
  > {
    params: TParams;
    searchParams: TSearchParams;
  }

  interface PageProps<
    TParams extends Params = Params,
    TSearchParams extends SearchParams | never = never,
  > {
    params: TParams;
    searchParams: TSearchParams;
  }

  const useParams: () => Params;
}
