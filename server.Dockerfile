FROM node:16-alpine AS base

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./package-lock.json ./
COPY ./common/types/package.json ./common/types/
COPY ./common/validators/package.json ./common/validators/
COPY ./server/package.json ./server/

RUN npm ci


FROM base AS build

COPY ./common/types ./common/types
RUN npm run build -w @common/types

COPY ./common/validators ./common/validators
RUN npm run build -w @common/validators

COPY ./server ./server
RUN npm run build -w server


FROM base

COPY --from=build ${APP_DIRECTORY}/common/types/dist/ ./common/types/dist/
COPY --from=build ${APP_DIRECTORY}/common/validators/dist/ ./common/validators/dist/
COPY --from=build ${APP_DIRECTORY}/server/dist/ ./server/dist/

RUN npm ci --omit=dev

RUN npm cache clean -f

CMD ["node", "server/dist/index.js"]
