import type { FC } from "react";

import {
  Card,
  CardDescription,
  CardSection,
  CardSeparator,
  CardTitle,
} from "@sandwich-ui/react";
import { sva } from "@sandwich-ui/styled-system/css";
import { format, parse } from "date-fns";

import type { Experience } from "../../types/experience";
import type { LanguageType } from "../../types/i18n";

import { dateFnsLocales } from "../../constants/i18n";
import { m } from "../../paraglide/messages";
import { getLanguageString } from "../../utilities/i18n";

export type ExperienceCardProps = {
  experience: Experience;
  language: LanguageType;
};

const experiencesTypeMap = {
  0: m["cv.experiences.type.0"],
  1: m["cv.experiences.type.1"],
  2: m["cv.experiences.type.2"],
};

const experienceCardRecipe = sva({
  base: {
    missionsList: {
      listStyleType: "disc",
      ml: 4,
    },
    title: {
      fontSize: { base: "lg", md: "xl" },
    },
  },
  slots: ["title", "missionsList"],
});

export const ExperienceCard: FC<ExperienceCardProps> = ({
  experience,
  language,
}) => {
  const classes = experienceCardRecipe();

  const startDateStr = format(
    parse(experience.startDate, "yyyy-MM", 0),
    "MMMM yyyy",
    {
      locale: dateFnsLocales[language],
    },
  );
  const endDateStr = experience.endDate
    ? format(parse(experience.endDate, "yyyy-MM", 0), "MMMM yyyy", {
        locale: dateFnsLocales[language],
      })
    : null;

  return (
    <Card>
      <CardSection>
        <CardTitle className={classes.title}>
          {getLanguageString(experience.title, language)} -{" "}
          {experiencesTypeMap[experience.type]()}
        </CardTitle>
        <CardDescription>
          {getLanguageString(experience.company, language)} -{" "}
          {getLanguageString(experience.location, language)} -{" "}
          {endDateStr
            ? m["cv.experiences.date.from-to"]({
                fromDate: startDateStr,
                toDate: endDateStr,
              })
            : m["cv.experiences.date.since"]({
                date: startDateStr,
              })}
        </CardDescription>
      </CardSection>
      {experience.missions.length ? (
        <>
          <CardSeparator />
          <CardSection>
            <ul className={classes.missionsList}>
              {experience.missions.map((mission, index) => (
                <li key={index}>{getLanguageString(mission, language)}</li>
              ))}
            </ul>
          </CardSection>
        </>
      ) : null}
    </Card>
  );
};
