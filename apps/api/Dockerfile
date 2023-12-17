FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

RUN npm install -g pnpm
RUN pnpm install turbo --global
# copy api and package folder
COPY . .

RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:20-alpine AS installer
# RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
# RUN pnpm install --frozen-lockfile
# RUN pnpm prisma generate

FROM node:20-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore

RUN turbo run build --scope=api --include-dependencies --no-deps

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=sourcer /app/ .

CMD [ "node", "apps/api/build/main.js" ]
