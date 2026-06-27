import type { FC } from "react";

import {
  Card,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";

import { skills } from "../../constants/cv";
import { m } from "../../paraglide/messages";
import { SkillCard } from "./skill-card";

const skillsRecipe = sva({
  base: {
    grid: {
      display: "grid",
      gap: 4,
      gridTemplateColumns: "repeat(2, 1fr)",
      lg: {
        gridTemplateColumns: "repeat(5, 1fr)",
      },
      sm: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    },
  },
  slots: ["grid"],
});

export const Skills: FC = () => {
  const classes = skillsRecipe();

  return (
    <section>
      <Card>
        <CardSection>
          <CardTitle>{m["cv.skills.title"]()}</CardTitle>
        </CardSection>
        <CardSeparator />
        <CardSection>
          <div className={classes.grid}>
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        </CardSection>
      </Card>
    </section>
  );
};
