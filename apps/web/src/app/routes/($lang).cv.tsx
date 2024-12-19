import { Icon } from "@iconify-icon/react";
import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { css } from "@sandwich-ui/core/css";
import {
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
  Navigation,
  NavigationItem,
  NavigationList,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@sandwich-ui/react";
import { format, parse } from "date-fns";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../../components/common/language-switcher";
import { ThemeSwitcher } from "../../components/common/theme-switcher";
import { educations, experiences, skills } from "../../constants/cv";
import { dateFnsLocales } from "../../constants/i18n";
import {
  BLUESKY_LINK,
  LINKEDIN_LINK,
  MAIL,
  MAIL_LINK,
  X_LINK,
} from "../../constants/link";
import { technologiesInfo } from "../../constants/technology";
import { useI18n } from "../../lib/i18n/useI18n";
import { LanguageType } from "../../types/i18n";
import { getLanguageString } from "../../utilities/i18n";

export const meta: MetaFunction = () => {
  return [
    { title: "Curriculum Vitae - MrSquaare" },
    { name: "description", content: "MrSquaare's curriculum vitae" },
  ];
};

const CVPage: FC = () => {
  const { t } = useTranslation("cv");
  const { language: lng } = useI18n();

  const language = lng as LanguageType;

  return (
    <>
      <div
        className={css({
          position: "sticky",
          top: 0,
          zIndex: 10,
          bg: "neutral.100",
          _dark: {
            bg: "neutral.800",
          },
        })}
      >
        <Navigation
          className={css({
            maxWidth: "1024px",
            mx: "auto",
            justifyContent: "space-between",
            px: 4,
            py: 2,
          })}
        >
          <NavigationList>
            <NavigationItem>
              <Button asChild variant={"outlined"}>
                <Link to={`/${language}`}>{t("nav.home")}</Link>
              </Button>
            </NavigationItem>
          </NavigationList>
          <NavigationList>
            <NavigationItem>
              <LanguageSwitcher />
            </NavigationItem>
            <NavigationItem>
              <ThemeSwitcher />
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <main
        className={css({
          minHeight: "screen",
          maxWidth: "1024px",
          mx: "auto",
          p: 4,
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            mb: 4,
            sm: {
              flexDirection: "row",
            },
          })}
        >
          <Avatar
            className={css({
              width: 40,
              height: 40,
            })}
          >
            <AvatarImage alt={"MrSquaare"} src={"/cv-picture.jpg"} />
            <AvatarFallback>GB</AvatarFallback>
          </Avatar>
          <div>
            <h1
              className={css({
                width: "min-content",
                textAlign: "center",
                fontSize: "6xl",
                fontWeight: "bold",
                lineHeight: "1.1",
                sm: {
                  textAlign: "start",
                },
                md: {
                  width: "max-content",
                },
              })}
            >
              Guillaume BONNET
            </h1>
            <h2
              className={css({
                textAlign: "center",
                fontSize: "2xl",
                lineHeight: "1",
                sm: {
                  textAlign: "start",
                },
              })}
            >
              {t("job_title")}
            </h2>
          </div>
        </div>
        <div
          className={css({
            display: "flex",
            flexDirection: "column-reverse",
            gap: 4,
            sm: {
              flexDirection: "row",
            },
          })}
        >
          <div
            className={css({
              flexBasis: "full",
              spaceY: 4,
              md: {
                flexBasis: "3/12",
              },
            })}
          >
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>{t("about_me.title")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <p>{t("about_me.content")}</p>
                </CardBody>
              </Card>
            </section>
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>{t("languages.title")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul>
                    <li>{t("languages.french")}</li>
                    <li>{t("languages.english")}</li>
                  </ul>
                </CardBody>
              </Card>
            </section>
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>{t("contacts.title")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul>
                    <li
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      })}
                    >
                      <Icon icon={"ph:envelope"} />
                      <Link
                        referrerPolicy={"no-referrer"}
                        rel={"noreferrer"}
                        target={"_blank"}
                        to={MAIL_LINK}
                      >
                        {MAIL}
                      </Link>
                    </li>
                    <li
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      })}
                    >
                      <Icon icon={"simple-icons:linkedin"} />
                      <Link
                        referrerPolicy={"no-referrer"}
                        rel={"noreferrer"}
                        target={"_blank"}
                        to={LINKEDIN_LINK}
                      >
                        g-bonnet
                      </Link>
                    </li>
                    <li
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      })}
                    >
                      <Icon icon={"simple-icons:x"} />
                      <Link
                        referrerPolicy={"no-referrer"}
                        rel={"noreferrer"}
                        target={"_blank"}
                        to={X_LINK}
                      >
                        @MrSquaare
                      </Link>
                    </li>
                    <li
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      })}
                    >
                      <Icon icon={"simple-icons:bluesky"} />
                      <Link
                        referrerPolicy={"no-referrer"}
                        rel={"noreferrer"}
                        target={"_blank"}
                        to={BLUESKY_LINK}
                      >
                        @mrsquaare.fr
                      </Link>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </section>
          </div>
          <div
            className={css({
              flexBasis: "full",
              spaceY: 4,
              md: {
                flexBasis: "9/12",
              },
            })}
          >
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>{t("experiences.title")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div
                    className={css({
                      spaceY: 4,
                    })}
                  >
                    {experiences.map((experience, index) => {
                      const startDateStr = format(
                        parse(experience.startDate, "yyyy-MM", 0),
                        "MMMM yyyy",
                        {
                          locale: dateFnsLocales[language],
                        },
                      );
                      const endDateStr = experience.endDate
                        ? format(
                            parse(experience.endDate, "yyyy-MM", 0),
                            "MMMM yyyy",
                            {
                              locale: dateFnsLocales[language],
                            },
                          )
                        : null;

                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle
                              className={css({
                                fontSize: "xl",
                              })}
                            >
                              {getLanguageString(experience.title, language)} -{" "}
                              {t(`experiences.type.${experience.type}`)}
                            </CardTitle>
                            <CardDescription>
                              {getLanguageString(experience.company, language)}{" "}
                              -{" "}
                              {getLanguageString(experience.location, language)}{" "}
                              -{" "}
                              {endDateStr
                                ? t(`experiences.date.from-to`, {
                                    fromDate: startDateStr,
                                    toDate: endDateStr,
                                  })
                                : t(`experiences.date.since`, {
                                    date: startDateStr,
                                  })}
                            </CardDescription>
                          </CardHeader>
                          {experience.missions.length ? (
                            <CardBody>
                              <ul
                                className={css({
                                  ml: 4,
                                  listStyleType: "disc",
                                })}
                              >
                                {experience.missions.map((mission, index) => (
                                  <li key={index}>
                                    {getLanguageString(mission, language)}
                                  </li>
                                ))}
                              </ul>
                            </CardBody>
                          ) : null}
                        </Card>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </section>
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>{t("educations.title")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div
                    className={css({
                      spaceY: 4,
                    })}
                  >
                    {educations.map((education, index) => {
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
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle
                              className={css({
                                fontSize: "xl",
                              })}
                            >
                              {getLanguageString(education.title, language)}
                              {education.specialty ? (
                                <>
                                  {" "}
                                  -{" "}
                                  {getLanguageString(
                                    education.specialty,
                                    language,
                                  )}
                                </>
                              ) : null}
                            </CardTitle>
                            <CardDescription>
                              {getLanguageString(education.school, language)} -{" "}
                              {getLanguageString(education.location, language)}{" "}
                              -{" "}
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
                </CardBody>
              </Card>
            </section>
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>{t("skills.title")}</CardTitle>
                </CardHeader>
                <CardBody>
                  <div
                    className={css({
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 4,
                      sm: {
                        gridTemplateColumns: "repeat(4, 1fr)",
                      },
                      md: {
                        gridTemplateColumns: "repeat(5, 1fr)",
                      },
                      lg: {
                        gridTemplateColumns: "repeat(5, 1fr)",
                      },
                    })}
                  >
                    {skills.map((skill, index) => (
                      <AspectRatio key={index} ratio={1}>
                        <Card
                          className={css({
                            display: "flex",
                            flexDirection: "column",
                            height: "full",
                            divideY: 0,
                          })}
                        >
                          <CardHeader>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <CardTitle
                                  className={css({
                                    fontSize: "md",
                                    textAlign: "center",
                                    lineClamp: 1,
                                  })}
                                >
                                  {technologiesInfo[skill.technology].name}
                                </CardTitle>
                              </TooltipTrigger>
                              <TooltipContent>
                                {technologiesInfo[skill.technology].name}
                              </TooltipContent>
                            </Tooltip>
                          </CardHeader>
                          <CardBody
                            className={css({
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexGrow: 1,
                              height: 0,
                            })}
                          >
                            <Icon
                              className={css({
                                width: "full",
                                height: "full",
                                color: "black",
                                _dark: {
                                  color: "white",
                                },
                              })}
                              height={"100%"}
                              icon={technologiesInfo[skill.technology].icon}
                              width={"100%"}
                            />
                          </CardBody>
                        </Card>
                      </AspectRatio>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default CVPage;
