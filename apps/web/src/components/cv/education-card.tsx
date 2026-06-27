import type { FC } from "react";

import {
  Card,
  CardDescription,
  CardSection,
  CardTitle,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";
import { format, parse } from "date-fns";

import type { Education } from "../../types/education";
import type { LanguageType } from "../../types/i18n";

import { dateFnsLocales } from "../../constants/i18n";
import { m } from "../../paraglide/messages";
import { getLanguageString } from "../../utilities/i18n";

export type EducationCardProps = {
  education: Education;
  language: LanguageType;
};

const educationCardRecipe = sva({
  base: {
    title: {
      fontSize: { base: "lg", md: "xl" },
    },
  },
  slots: ["title"],
});

export const EducationCard: FC<EducationCardProps> = ({
  education,
  language,
}) => {
  const classes = educationCardRecipe();

  const startDateStr = format(
    parse(education.startDate, "yyyy-MM", new Date()),
    "MMMM yyyy",
    {
      locale: dateFnsLocales[language],
    },
  );
  const endDateStr = format(
    parse(education.endDate, "yyyy-MM", new Date()),
    "MMMM yyyy",
    {
      locale: dateFnsLocales[language],
    },
  );

  return (
    <Card>
      <CardSection>
        <CardTitle className={classes.title}>
          {getLanguageString(education.title, language)}
          {education.specialty ? (
            <> - {getLanguageString(education.specialty, language)}</>
          ) : null}
        </CardTitle>
        <CardDescription>
          {getLanguageString(education.school, language)} -{" "}
          {getLanguageString(education.location, language)} -{" "}
          {m["cv.educations.date.from-to"]({
            fromDate: startDateStr,
            toDate: endDateStr,
          })}
        </CardDescription>
      </CardSection>
    </Card>
  );
};
