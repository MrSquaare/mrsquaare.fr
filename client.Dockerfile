FROM node:16-alpine AS base

ENV APP_DIRECTORY="/usr/src/app"

ENV PATH="${PATH}:${APP_DIRECTORY}/node_modules/.bin/"
ENV NEXT_TELEMETRY_DISABLED="1"

WORKDIR ${APP_DIRECTORY}

COPY ./package.json ./package-lock.json ./
COPY ./client/package.json ./client/

RUN npm ci


FROM base AS build

COPY ./ ./

RUN npm run build -w client


FROM base

COPY --from=build ${APP_DIRECTORY}/client/next.config.js ./client
COPY --from=build ${APP_DIRECTORY}/client/.next/ ./client/.next/
COPY --from=build ${APP_DIRECTORY}/client/public/ ./client/public/

RUN npm ci --production

RUN npm cache clean -f

CMD ["npm", "run", "start", "-w", "client"]
