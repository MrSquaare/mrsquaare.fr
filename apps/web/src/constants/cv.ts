import type { Education } from "../types/education";
import type { Experience } from "../types/experience";
import type { Skill } from "../types/skill";

import { ExperienceType } from "../types/experience";
import { Technology } from "../types/technology";

export const experiences: Experience[] = [
  {
    company: "Sogeti",
    endDate: null,
    location: "Toulouse, France",
    missions: [],
    startDate: "2023-11",
    technologies: [],
    title: {
      en: "Web developer",
      fr: "Développeur web",
    },
    type: ExperienceType.CONTRACT,
  },
  {
    company: "Bleemeo",
    endDate: "2023-09",
    location: "Toulouse, France",
    missions: [
      {
        en: "Development of web and mobile applications",
        fr: "Développement des applications web et mobile",
      },
      {
        en: "Modernization of the technical stack",
        fr: "Modernisation de la stack technique",
      },
      {
        en: "Addition of new features",
        fr: "Ajout de nouvelles fonctionnalités",
      },
    ],
    startDate: "2021-09",
    technologies: [
      Technology.JAVASCRIPT,
      Technology.TYPESCRIPT,
      Technology.REACT,
      Technology.REACT_NATIVE,
    ],
    title: {
      en: "Web and mobile developer",
      fr: "Développeur web et mobile",
    },
    type: ExperienceType.APPRENTICESHIP,
  },
  {
    company: "Bleemeo",
    endDate: "2021-07",
    location: "Toulouse, France",
    missions: [
      {
        en: "Development of web and mobile applications",
        fr: "Développement des applications web et mobile",
      },
      {
        en: "Addition of new features",
        fr: "Ajout de nouvelles fonctionnalités",
      },
    ],
    startDate: "2021-04",
    technologies: [
      Technology.JAVASCRIPT,
      Technology.TYPESCRIPT,
      Technology.REACT,
      Technology.REACT_NATIVE,
    ],
    title: {
      en: "Web and mobile developer",
      fr: "Développeur web et mobile",
    },
    type: ExperienceType.INTERNSHIP,
  },
  {
    company: "Bleemeo",
    endDate: "2019-12",
    location: "Toulouse, France",
    missions: [
      {
        en: "Development of a metrics aggregator",
        fr: "Développement d'un agrégateur de métriques",
      },
      {
        en: "Integration into the existing solution",
        fr: "Intégration dans la solution existante",
      },
    ],
    startDate: "2019-09",
    technologies: [Technology.GO, Technology.CASSANDRA],
    title: {
      en: "Software developer",
      fr: "Développeur logiciel",
    },
    type: ExperienceType.INTERNSHIP,
  },
];

export const educations: Education[] = [
  {
    endDate: "2023-09",
    location: "Toulouse, France",
    school: "Ynov",
    specialty: {
      en: "Web development",
      fr: "Développement web",
    },
    startDate: "2021-09",
    title: {
      en: "Master's degree in computer science and information systems",
      fr: "Master en informatique et système d'information",
    },
  },
  {
    endDate: "2021-07",
    location: "Toulouse, France",
    school: "Epitech",
    startDate: "2018-09",
    title: {
      en: "Bachelor's degree in information technology",
      fr: "Bachelor en technologies de l'information",
    },
  },
];

export const skills: Skill[] = [
  {
    level: 4,
    technology: Technology.HTML,
  },
  {
    level: 4,
    technology: Technology.CSS,
  },
  {
    level: 4,
    technology: Technology.JAVASCRIPT,
  },
  {
    level: 4,
    technology: Technology.TYPESCRIPT,
  },
  {
    level: 4,
    technology: Technology.REACT,
  },
  {
    level: 4,
    technology: Technology.NEXT_JS,
  },
  {
    level: 3,
    technology: Technology.REMIX,
  },
  {
    level: 2,
    technology: Technology.ASTRO,
  },
  {
    level: 3,
    technology: Technology.SASS,
  },
  {
    level: 4,
    technology: Technology.TAILWIND_CSS,
  },
  {
    level: 3,
    technology: Technology.PANDA_CSS,
  },
  {
    level: 3,
    technology: Technology.REACT_NATIVE,
  },
  {
    level: 3,
    technology: Technology.CAPACITOR,
  },
  {
    level: 3,
    technology: Technology.NODE_JS,
  },
  {
    level: 4,
    technology: Technology.EXPRESS_JS,
  },
  {
    level: 3,
    technology: Technology.FASTIFY,
  },
  {
    level: 3,
    technology: Technology.NEST_JS,
  },
  {
    level: 4,
    technology: Technology.REST,
  },
  {
    level: 3,
    technology: Technology.GRAPHQL,
  },
  {
    level: 2,
    technology: Technology.DART,
  },
  {
    level: 2,
    technology: Technology.FLUTTER,
  },
  {
    level: 4,
    technology: Technology.GIT,
  },
  {
    level: 4,
    technology: Technology.DOCKER,
  },
  {
    level: 3,
    technology: Technology.DEVOPS,
  },
  {
    level: 1,
    technology: Technology.AWS,
  },
];
