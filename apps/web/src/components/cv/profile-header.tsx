import type { FC } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";

import { m } from "../../paraglide/messages";

const profileHeaderRecipe = sva({
  base: {
    avatar: {
      height: 40,
      width: 40,
    },
    root: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: { base: 3, md: 4 },
      justifyContent: "center",
      mb: { base: 6, md: 8 },
      sm: {
        flexDirection: "row",
      },
    },
    subtitle: {
      fontSize: { base: "lg", md: "2xl" },
      lineHeight: "1",
      sm: {
        textAlign: "start",
      },
      textAlign: "center",
    },
    title: {
      fontSize: { base: "4xl", md: "6xl" },
      fontWeight: "bold",
      lineHeight: "1.1",
      textAlign: "center",
    },
  },
  slots: ["root", "avatar", "title", "subtitle"],
});

export const ProfileHeader: FC = () => {
  const classes = profileHeaderRecipe();

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <AvatarImage alt={"MrSquaare"} src={"/cv-picture.jpg"} />
        <AvatarFallback>GB</AvatarFallback>
      </Avatar>
      <div>
        <h1 className={classes.title}>Guillaume BONNET</h1>
        <h2 className={classes.subtitle}>{m["cv.job_title"]()}</h2>
      </div>
    </div>
  );
};
