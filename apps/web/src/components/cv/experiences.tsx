import type { FC } from "react";

import {
  Card,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";

import type { LanguageType } from "../../types/i18n";

import { experiences } from "../../constants/cv";
import { m } from "../../paraglide/messages";
import { ExperienceCard } from "./experience-card";

export type ExperiencesProps = {
  language: LanguageType;
};

const experiencesRecipe = sva({
  base: {
    container: {
      spaceY: 4,
    },
  },
  slots: ["container"],
});

export const Experiences: FC<ExperiencesProps> = ({ language }) => {
  const classes = experiencesRecipe();

  return (
    <section>
      <Card>
        <CardSection>
          <CardTitle>{m["cv.experiences.title"]()}</CardTitle>
        </CardSection>
        <CardSeparator />
        <CardSection>
          <div className={classes.container}>
            {experiences.map((experience, index) => (
              <ExperienceCard
                experience={experience}
                key={index}
                language={language}
              />
            ))}
          </div>
        </CardSection>
      </Card>
    </section>
  );
};
