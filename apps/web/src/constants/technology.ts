import type { TechnologyInfo } from "../types/technology";

import { Technology } from "../types/technology";

export const technologiesInfo: Record<Technology, TechnologyInfo> = {
  [Technology.ASTRO]: { icon: "simple-icons:astro", name: "Astro" },
  [Technology.AWS]: { icon: "simple-icons:amazonwebservices", name: "AWS" },
  [Technology.CAPACITOR]: { icon: "simple-icons:capacitor", name: "Capacitor" },
  [Technology.CASSANDRA]: { icon: "simple-icons:cassandra", name: "Cassandra" },
  [Technology.CSS]: { icon: "simple-icons:css3", name: "CSS" },
  [Technology.DART]: { icon: "simple-icons:dart", name: "Dart" },
  [Technology.DEVOPS]: { icon: "mdi:infinity", name: "DevOps" },
  [Technology.DOCKER]: { icon: "simple-icons:docker", name: "Docker" },
  [Technology.EXPRESS_JS]: { icon: "simple-icons:express", name: "Express.js" },
  [Technology.FASTIFY]: { icon: "simple-icons:fastify", name: "Fastify" },
  [Technology.FLUTTER]: { icon: "simple-icons:flutter", name: "Flutter" },
  [Technology.GIT]: { icon: "simple-icons:git", name: "Git" },
  [Technology.GO]: { icon: "simple-icons:go", name: "Go" },
  [Technology.GRAPHQL]: { icon: "simple-icons:graphql", name: "GraphQL" },
  [Technology.HTML]: { icon: "simple-icons:html5", name: "HTML" },
  [Technology.JAVASCRIPT]: {
    icon: "simple-icons:javascript",
    name: "JavaScript",
  },
  [Technology.NEST_JS]: { icon: "simple-icons:nestjs", name: "Nest.js" },
  [Technology.NEXT_JS]: { icon: "simple-icons:nextdotjs", name: "Next.js" },
  [Technology.NODE_JS]: { icon: "simple-icons:nodedotjs", name: "Node.js" },
  [Technology.PANDA_CSS]: { icon: "mdi:panda", name: "Panda CSS" },
  [Technology.PROMETHEUS]: {
    icon: "simple-icons:prometheus",
    name: "Prometheus",
  },
  [Technology.REACT]: { icon: "simple-icons:react", name: "React" },
  [Technology.REACT_NATIVE]: {
    icon: "simple-icons:react",
    name: "React Native",
  },
  [Technology.REMIX]: { icon: "simple-icons:remix", name: "Remix" },
  [Technology.REST]: { icon: "dashicons:rest-api", name: "REST" },
  [Technology.SASS]: { icon: "simple-icons:sass", name: "Sass" },
  [Technology.TAILWIND_CSS]: {
    icon: "simple-icons:tailwindcss",
    name: "Tailwind CSS",
  },
  [Technology.TYPESCRIPT]: {
    icon: "simple-icons:typescript",
    name: "TypeScript",
  },
};
