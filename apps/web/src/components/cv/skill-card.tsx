import type { FC } from "react";

import { Icon } from "@iconify-icon/react";
import {
  AspectRatio,
  Card,
  CardSection,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";

import type { Skill } from "../../types/skill";

import { technologiesInfo } from "../../constants/technology";

export type SkillCardProps = {
  skill: Skill;
};

const skillCardRecipe = sva({
  base: {
    card: {
      display: "flex",
      flexDirection: "column",
      height: "full",
    },
    icon: {
      _dark: {
        color: "white",
      },
      color: "black",
      height: "full",
      width: "full",
    },
    iconWrapper: {
      alignItems: "center",
      display: "flex",
      flexGrow: 1,
      height: 0,
      justifyContent: "center",
    },
    title: {
      fontSize: "md",
      lineClamp: 1,
      textAlign: "center",
    },
  },
  slots: ["card", "title", "iconWrapper", "icon"],
});

export const SkillCard: FC<SkillCardProps> = ({ skill }) => {
  const classes = skillCardRecipe();

  return (
    <AspectRatio ratio={1}>
      <Card className={classes.card}>
        <CardSection>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className={classes.title}>
                {technologiesInfo[skill.technology].name}
              </CardTitle>
            </TooltipTrigger>
            <TooltipPositioner>
              <TooltipContent>
                {technologiesInfo[skill.technology].name}
              </TooltipContent>
            </TooltipPositioner>
          </Tooltip>
        </CardSection>
        <CardSection className={classes.iconWrapper}>
          <Icon
            className={classes.icon}
            height={"100%"}
            icon={technologiesInfo[skill.technology].icon}
            width={"100%"}
          />
        </CardSection>
      </Card>
    </AspectRatio>
  );
};
