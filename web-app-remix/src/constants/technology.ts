import { Technology, TechnologyInfo } from "../types/technology";

export const technologiesInfo: Record<Technology, TechnologyInfo> = {
  [Technology.HTML]: { name: "HTML", icon: "simple-icons:html5" },
  [Technology.CSS]: { name: "CSS", icon: "simple-icons:css3" },
  [Technology.JAVASCRIPT]: {
    name: "JavaScript",
    icon: "simple-icons:javascript",
  },
  [Technology.TYPESCRIPT]: {
    name: "TypeScript",
    icon: "simple-icons:typescript",
  },
  [Technology.REACT]: { name: "React", icon: "simple-icons:react" },
  [Technology.NEXT_JS]: { name: "Next.js", icon: "simple-icons:nextdotjs" },
  [Technology.REMIX]: { name: "Remix", icon: "simple-icons:remix" },
  [Technology.ASTRO]: { name: "Astro", icon: "simple-icons:astro" },
  [Technology.SASS]: { name: "Sass", icon: "simple-icons:sass" },
  [Technology.TAILWIND_CSS]: {
    name: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
  },
  [Technology.PANDA_CSS]: { name: "Panda CSS", icon: "mdi:panda" },
  [Technology.REACT_NATIVE]: {
    name: "React Native",
    icon: "simple-icons:react",
  },
  [Technology.NODE_JS]: { name: "Node.js", icon: "simple-icons:nodedotjs" },
  [Technology.EXPRESS_JS]: { name: "Express.js", icon: "simple-icons:express" },
  [Technology.FASTIFY]: { name: "Fastify", icon: "simple-icons:fastify" },
  [Technology.NEST_JS]: { name: "Nest.js", icon: "simple-icons:nestjs" },
  [Technology.REST]: { name: "REST", icon: "dashicons:rest-api" },
  [Technology.GRAPHQL]: { name: "GraphQL", icon: "simple-icons:graphql" },
  [Technology.CAPACITOR]: { name: "Capacitor", icon: "simple-icons:capacitor" },
  [Technology.DART]: { name: "Dart", icon: "simple-icons:dart" },
  [Technology.FLUTTER]: { name: "Flutter", icon: "simple-icons:flutter" },
  [Technology.GIT]: { name: "Git", icon: "simple-icons:git" },
  [Technology.DOCKER]: { name: "Docker", icon: "simple-icons:docker" },
  [Technology.DEVOPS]: { name: "DevOps", icon: "mdi:infinity" },
  [Technology.GO]: { name: "Go", icon: "simple-icons:go" },
  [Technology.CASSANDRA]: { name: "Cassandra", icon: "simple-icons:cassandra" },
  [Technology.PROMETHEUS]: {
    name: "Prometheus",
    icon: "simple-icons:prometheus",
  },
  [Technology.AWS]: { name: "AWS", icon: "simple-icons:amazonwebservices" },
};
