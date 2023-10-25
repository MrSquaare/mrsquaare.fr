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
    technology: Technology.SASS,
    years: 3,
  },
  {
    technology: Technology.TAILWIND_CSS,
    years: 1,
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
    technology: Technology.DART,
    years: 1,
  },
  {
    technology: Technology.FLUTTER,
    years: 1,
  },
  {
    technology: Technology.GIT,
    years: 5,
  },
  {
    technology: Technology.DOCKER,
    years: 3,
  },
  {
    technology: Technology.DEVOPS,
    years: 3,
  },
];

export const projects: Project[] = [
  {
    title: {
      en: "mrsquaare.fr (This page)",
      fr: "mrsquaare.fr (Cette page)",
    },
    description: {
      en: "My personal website.",
      fr: "Mon site web personnel.",
    },
    technologies: [
      Technology.JAVASCRIPT,
      Technology.TYPESCRIPT,
      Technology.REACT,
      Technology.NEXT_JS,
      Technology.TAILWIND_CSS,
      Technology.DOCKER,
    ],
    links: [
      {
        title: {
          en: "Website",
          fr: "Site web",
        },
        url: "https://mrsquaare.fr/cv",
        icon: "ph:link",
      },
      {
        title: "GitHub",
        url: "https://github.com/MrSquaare/mrsquaare.fr",
        icon: "ph:github-logo",
      },
    ],
  },
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
];
