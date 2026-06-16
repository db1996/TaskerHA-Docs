FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* .npmrc* ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm docs:build


FROM nginx:alpine AS server

COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
