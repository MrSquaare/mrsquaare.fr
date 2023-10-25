import { useParams, useRouter } from "next/navigation";
import { FC, useCallback } from "react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export const LanguageSwitcher: FC = () => {
  const router = useRouter();
  const params = useParams();

  const setLanguage = useCallback(
    (language: string) => {
      const pathnameWithSearch = location.pathname + location.search;

      router.push(pathnameWithSearch.replace(/\/[a-z]{2}/, `/${language}`));
    },
    [router],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          {String(params.lng).toUpperCase()}
          <span className={"sr-only"}>Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuItem onClick={() => setLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("fr")}>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
