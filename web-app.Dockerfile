FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${PNPM_HOME}"

RUN corepack enable pnpm

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./web-app/package.json ./web-app/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


FROM base AS build

COPY ./turbo.json ./turbo.json
COPY ./web-app ./web-app
RUN pnpm build:web


FROM base

COPY --from=build ${APP_DIRECTORY}/web-app/build/ ./web-app/build/

ENV NODE_ENV="production"

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

RUN apk add --no-cache dumb-init

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["pnpm", "-F", "web-app", "start"]
