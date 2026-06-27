import type { FC } from "react";

import {
  Card,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";

import type { LanguageType } from "../../types/i18n";

import { educations } from "../../constants/cv";
import { m } from "../../paraglide/messages";
import { EducationCard } from "./education-card";

export type EducationsProps = {
  language: LanguageType;
};

const educationsRecipe = sva({
  base: {
    container: {
      spaceY: 4,
    },
  },
  slots: ["container"],
});

export const Educations: FC<EducationsProps> = ({ language }) => {
  const classes = educationsRecipe();

  return (
    <section>
      <Card>
        <CardSection>
          <CardTitle>{m["cv.educations.title"]()}</CardTitle>
        </CardSection>
        <CardSeparator />
        <CardSection>
          <div className={classes.container}>
            {educations.map((education, index) => (
              <EducationCard
                education={education}
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
