import { format, parse } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";

import {
  educations,
  experiences,
  projects,
  skills,
} from "../../constants/hire-me";
import { dateFnsLocales } from "../../constants/i18n";
import {
  LINKEDIN_LINK,
  MAIL,
  MAIL_LINK,
  TWITTER_LINK,
} from "../../constants/link";
import { iconByTechnology, nameByTechnology } from "../../constants/technology";
import { useTranslation } from "../../i18n/client";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Icon } from "../ui/icon";

export const HireMe: FC = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng, "hire_me");

  return (
    <>
      <div
        className={
          "mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row"
        }
      >
        <Avatar className={"h-40 w-40"}>
          <AvatarImage
            alt={"MrSquaare"}
            src={"https://api.dicebear.com/6.x/thumbs/svg?seed=Abby"}
          />
          <AvatarFallback>GB</AvatarFallback>
        </Avatar>
        <div>
          <h1
            className={
              "w-min text-center text-6xl font-bold sm:text-start md:w-max"
            }
          >
            Guillaume BONNET
          </h1>
          <h2 className={"text-center text-2xl sm:text-start"}>
            {t("job_title")}
          </h2>
        </div>
      </div>
      <div className={"flex flex-col-reverse gap-4 md:flex-row"}>
        <div className={"basis-full space-y-4 md:basis-3/12"}>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("about_me.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("about_me.content")}</p>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("languages.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>{t("languages.french")}</li>
                  <li>{t("languages.english")}</li>
                </ul>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("contacts.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li className={"flex items-center space-x-1"}>
                    <Icon icon={"ph:envelope"} />
                    <Link
                      href={MAIL_LINK}
                      referrerPolicy={"no-referrer"}
                      target={"_blank"}
                    >
                      {MAIL}
                    </Link>
                  </li>
                  <li className={"flex items-center space-x-1"}>
                    <Icon icon={"ph:linkedin-logo"} />
                    <Link
                      href={LINKEDIN_LINK}
                      referrerPolicy={"no-referrer"}
                      target={"_blank"}
                    >
                      g-bonnet
                    </Link>
                  </li>
                  <li className={"flex items-center space-x-1"}>
                    <Icon icon={"ph:twitter-logo"} />
                    <Link
                      href={TWITTER_LINK}
                      referrerPolicy={"no-referrer"}
                      target={"_blank"}
                    >
                      MrSquaare
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
        <div className={"basis-full space-y-4 md:basis-9/12"}>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("experiences.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={"space-y-4"}>
                  {experiences.map((experience, index) => {
                    const startDateStr = format(
                      parse(experience.startDate, "yyyy-MM", 0),
                      "MMMM yyyy",
                      {
                        locale: dateFnsLocales[lng],
                      },
                    );
                    const endDateStr = format(
                      parse(experience.endDate, "yyyy-MM", 0),
                      "MMMM yyyy",
                      {
                        locale: dateFnsLocales[lng],
                      },
                    );

                    return (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className={"text-xl"}>
                            {experience.title[lng]} -{" "}
                            {t(`experiences.type.${experience.type}`)}
                          </CardTitle>
                          <CardDescription>
                            {experience.company} - {experience.location} -{" "}
                            {t(`experiences.date.from-to`, {
                              fromDate: startDateStr,
                              toDate: endDateStr,
                            })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className={"ml-4 list-disc"}>
                            {experience.missions.map((mission, index) => (
                              <li key={index}>{mission[lng]}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("educations.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={"space-y-4"}>
                  {educations.map((education, index) => {
                    const startDateStr = format(
                      parse(education.startDate, "yyyy-MM", new Date()),
                      "MMMM yyyy",
                      {
                        locale: dateFnsLocales[lng],
                      },
                    );
                    const endDateStr = format(
                      parse(education.endDate, "yyyy-MM", new Date()),
                      "MMMM yyyy",
                      {
                        locale: dateFnsLocales[lng],
                      },
                    );

                    return (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className={"text-xl"}>
                            {education.title[lng]}
                            {education.specialty ? (
                              <> - {education.specialty[lng]}</>
                            ) : null}
                          </CardTitle>
                          <CardDescription>
                            {education.school} - {education.location} -{" "}
                            {t(`experiences.date.from-to`, {
                              fromDate: startDateStr,
                              toDate: endDateStr,
                            })}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("skills.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={
                    "grid grid-cols-3 gap-4 print:!grid-cols-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
                  }
                >
                  {skills.map((skill, index) => (
                    <AspectRatio key={index} ratio={1}>
                      <Card className={"flex h-full flex-col"}>
                        <CardHeader className={"p-1"}>
                          <CardTitle className={"text-md text-center"}>
                            {nameByTechnology[skill.technology]}
                          </CardTitle>
                        </CardHeader>
                        <CardContent
                          className={
                            "flex h-0 grow items-center justify-center p-2 pt-0"
                          }
                        >
                          <Icon
                            className={"text-dark dark:text-white"}
                            height={"100%"}
                            icon={iconByTechnology[skill.technology]}
                          />
                        </CardContent>
                        <CardFooter
                          className={
                            "flex shrink-0 items-center justify-center p-1 pt-0"
                          }
                        >
                          <Badge>
                            {t("skills.years", { count: skill.years })}
                          </Badge>
                        </CardFooter>
                      </Card>
                    </AspectRatio>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <Card>
              <CardHeader>
                <CardTitle>{t("projects.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={"space-y-4"}>
                  {projects.map((project, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className={"flex flex-row flex-wrap items-center"}>
                          <CardTitle className={"text-xl"}>
                            {project.title}
                          </CardTitle>
                          {project.inDevelopment ? (
                            <Badge className={"ml-auto"} variant={"outline"}>
                              {t("projects.in_development")}
                            </Badge>
                          ) : null}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{project.description[lng]}</p>
                      </CardContent>
                      <CardFooter>
                        <div>
                          <div className={"mb-2 flex flex-wrap gap-1"}>
                            {project.technologies.map((technology, index) => (
                              <Badge key={index}>
                                <Icon
                                  className={"mr-1"}
                                  icon={iconByTechnology[technology]}
                                />
                                <span>{nameByTechnology[technology]}</span>
                              </Badge>
                            ))}
                          </div>
                          <div>
                            {project.links.map((link, index) => (
                              <Link
                                className={"flex items-center gap-1"}
                                href={link.url}
                                key={index}
                                referrerPolicy={"no-referrer"}
                                target={"_blank"}
                              >
                                <Icon icon={link.icon} />
                                {link.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};
