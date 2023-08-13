import { Education } from "../types/education";
import { Experience, ExperienceType } from "../types/experience";
import { Project } from "../types/project";
import { Skill } from "../types/skill";
import { Technology } from "../types/technology";

export const experiences: Experience[] = [
  {
    title: {
      en: "Web and mobile developer",
      fr: "Développeur web et mobile",
    },
    type: ExperienceType.APPRENTICESHIP,
    company: "Bleemeo",
    location: "Toulouse, France",
    startDate: "2021-09",
    endDate: "2023-09",
    missions: [
      {
        en: "Development of web and mobile applications",
        fr: "Développement des applications web et mobile",
      },
      {
        en: "Modernisation of the technical stack",
        fr: "Modernisation de la stack technique",
      },
      {
        en: "Addition of new features",
        fr: "Ajout de nouvelles fonctionnalités",
      },
    ],
    technologies: [
      Technology.JAVASCRIPT,
      Technology.TYPESCRIPT,
      Technology.REACT,
      Technology.REACT_NATIVE,
    ],
  },
  {
    title: {
      en: "Web and mobile developer",
      fr: "Développeur web et mobile",
    },
    type: ExperienceType.INTERNSHIP,
    company: "Bleemeo",
    location: "Toulouse, France",
    startDate: "2021-04",
    endDate: "2021-07",
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
    technologies: [
      Technology.JAVASCRIPT,
      Technology.TYPESCRIPT,
      Technology.REACT,
      Technology.REACT_NATIVE,
    ],
  },
  {
    title: {
      en: "Software developer",
      fr: "Développeur logiciel",
    },
    type: ExperienceType.INTERNSHIP,
    company: "Bleemeo",
    location: "Toulouse, France",
    startDate: "2019-09",
    endDate: "2019-12",
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
    technologies: [Technology.GO, Technology.CASSANDRA],
  },
];

export const educations: Education[] = [
  {
    title: {
      en: "Master's degree in computer science and information systems",
      fr: "Master en informatique et système d'information",
    },
    specialty: {
      en: "Web development",
      fr: "Développement web",
    },
    school: "Ynov",
    location: "Toulouse, France",
    startDate: "2021-09",
    endDate: "2023-09",
  },
  {
    title: {
      en: "Bachelor's degree in information technology",
      fr: "Bachelor en technologies de l'information",
    },
    school: "Epitech",
    location: "Toulouse, France",
    startDate: "2018-09",
    endDate: "2021-07",
  },
];

export const skills: Skill[] = [
  {
    technology: Technology.HTML,
    years: 5,
  },
  {
    technology: Technology.CSS,
    years: 5,
  },
  {
    technology: Technology.JAVASCRIPT,
    years: 5,
  },
  {
    technology: Technology.TYPESCRIPT,
    years: 3,
  },
  {
    technology: Technology.REACT,
    years: 3,
  },
  {
    technology: Technology.NEXT_JS,
    years: 2,
  },
  {
    technology: Technology.REACT_NATIVE,
    years: 3,
  },
  {
    technology: Technology.CAPACITOR,
    years: 2,
  },
  {
    technology: Technology.NODE_JS,
    years: 3,
  },
  {
    technology: Technology.EXPRESS_JS,
    years: 3,
  },
  {
    technology: Technology.FASTIFY,
    years: 2,
  },
  {
    technology: Technology.NEST_JS,
    years: 2,
  },
  {
    technology: Technology.REST,
    years: 3,
  },
  {
    technology: Technology.GRAPHQL,
    years: 2,
  },
  {
    technology: Technology.TAILWIND_CSS,
    years: 1,
  },
  {
    technology: Technology.DART,
    years: 1,
  },
  {
    technology: Technology.FLUTTER,
    years: 1,
  },
  {
    technology: Technology.DOCKER,
    years: 3,
  },
];

export const projects: Project[] = [
  {
    title: "Fiesta",
    description: {
      en: "Twitter clone for educational purposes.",
      fr: "Clone de Twitter à but éducatif.",
    },
    inDevelopment: true,
    technologies: [
      Technology.JAVASCRIPT,
      Technology.TYPESCRIPT,
      Technology.REACT,
      Technology.CAPACITOR,
      Technology.TAILWIND_CSS,
      Technology.NODE_JS,
      Technology.NEST_JS,
      Technology.GRAPHQL,
      Technology.DOCKER,
    ],
    links: [
      {
        title: "GitHub",
        url: "https://github.com/MrSquaare/fiesta",
        icon: "ph:github-logo",
      },
    ],
  },
  {
    title: "TaskTonic",
    description: {
      en: "Daily reminder task organizer.",
      fr: "Organisateur de tâche à rappel quotidien.",
    },
    inDevelopment: true,
    technologies: [Technology.DART, Technology.FLUTTER],
    links: [
      {
        title: "GitHub",
        url: "https://github.com/MrSquaare/fiesta",
        icon: "ph:github-logo",
      },
    ],
  },
  {
    title: "SquirrelDB",
    description: {
      en: "Cassandra-based time series database (TSDB) with Prometheus remote read/write support.",
      fr: "Base de données de séries chronologiques (TSDB) basée sur Cassandra et compatible avec la lecture et écriture à distance de Prometheus.",
    },
    technologies: [Technology.GO, Technology.CASSANDRA],
    links: [
      {
        title: "GitHub",
        url: "https://github.com/bleemeo/squirreldb",
        icon: "ph:github-logo",
      },
    ],
  },
];
