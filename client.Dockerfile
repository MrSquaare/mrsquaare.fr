FROM node:16-alpine AS base

ARG API_BASE_URL

ENV APP_DIRECTORY="/usr/src/app"
ENV API_BASE_URL=${API_BASE_URL}

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"
ENV NEXT_TELEMETRY_DISABLED="1"

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./package-lock.json ./
COPY ./common/types/package.json ./common/types/
COPY ./client/package.json ./client/

RUN npm ci


FROM base AS build

COPY ./common/types ./common/types
RUN npm run build -w @common/types

COPY ./.eslintrc.js ./.eslintrc.js
COPY ./client ./client
RUN npm run build -w client


FROM base

COPY --from=build ${APP_DIRECTORY}/common/types/dist/ ./common/types/dist/
COPY --from=build ${APP_DIRECTORY}/client/next.config.js ./client
COPY --from=build ${APP_DIRECTORY}/client/.next/ ./client/.next/
COPY --from=build ${APP_DIRECTORY}/client/public/ ./client/public/

RUN npm ci --omit=dev

RUN npm cache clean -f

CMD ["next", "start", "client/"]
