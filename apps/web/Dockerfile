FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${PNPM_HOME}"
ENV TURBO_TELEMETRY_DISABLED="1"

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
RUN corepack enable pnpm
COPY ./apps/web/package.json ./apps/web/


FROM base AS build

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./turbo.json ./turbo.json
COPY ./apps/web ./apps/web
RUN pnpm build


FROM base

COPY --from=build ${APP_DIRECTORY}/apps/web/build/ ./apps/web/build/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

RUN apk add --no-cache dumb-init

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD ["pnpm", "-F", "@mrsquaare-fr/web", "start"]
