# syntax = docker/dockerfile:1

FROM oven/bun:1.3 AS build

WORKDIR /app

ENV NODE_ENV="production"

COPY --link package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY --link . .
RUN bun run build-storybook

FROM nginx:alpine

COPY --from=build /app/storybook-static /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
