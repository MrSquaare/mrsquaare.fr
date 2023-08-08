FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${PNPM_HOME}"
ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"
ENV NEXT_TELEMETRY_DISABLED="1"

RUN corepack enable pnpm

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./web-app/package.json ./web-app/

RUN pnpm i


FROM base AS build

COPY ./.eslintrc.js ./.eslintrc.js
COPY ./turbo.json ./turbo.json
COPY ./web-app ./web-app
RUN pnpm build:web


FROM base

COPY --from=build ${APP_DIRECTORY}/web-app/next.config.js ./web-app
COPY --from=build ${APP_DIRECTORY}/web-app/.next/ ./web-app/.next/
COPY --from=build ${APP_DIRECTORY}/web-app/public/ ./web-app/public/

RUN pnpm i --prod

RUN pnpm store prune

CMD ["next", "start", "web-app/"]
