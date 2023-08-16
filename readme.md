# Menu-mono

<https://cafe-like-menu.netlify.app/>

[![Netlify Status](https://api.netlify.com/api/v1/badges/64f89d24-c5c7-4ade-b6a5-89e480d5d2ea/deploy-status)](https://app.netlify.com/sites/cafe-like-menu/deploys)

## Techstack

- pnpm - monorepo and dependencies (<https://pnpm.io/installation>)
  - pnpm install - install all dependencies
  - pnpm -r update (-L) - update all dependencies (latest)
- nestjs - api seriver (<https://docs.nestjs.com>)
- prisma
- graphQL
- redis - data caching
- nextjs - web client (<https://nextjs.org/docs>)
- tailwind
- turborepo - build\test\lint caching (<https://turbo.build/repo/docs>)
- turbopack
- Zustand - state managment tool (<https://docs.pmnd.rs/zustand/getting-started/introduction>)
- Immer - immutability tool (<https://immerjs.github.io/immer/>)

## How to setup the project

- `npm install -g pnpm` - instal pnpm globaly
- `pnpm setup` - set up system configuration for pnpm
- `pnpm install turbo --global` - install turbo globaly
- `pnpm install` - install dependencies
- `pnpm libs:build` - build all libraries

how to setup api-server read in `apps/api/readme.md`

## Run the apps

- `pnpm run web:dev` - run web
- `pnpm run web-admin:dev` - run web-admin
- `pnpm run api:dev` - run api server

## Additional commands

- `pnpm install` - install dependencies
- `pnpm add [lib name]` - add a new dependency
- `pnpm add [lib name] --filter [app name]` - add a new dependency to specific app
- `pnpm up -r -i`  - update all dependencies
- `pnpm up -r -i --workspace api` - update dependencies for `api` app
- `pnpm create next-app new-next-app` - create a new nextjs app
- `pnpm create next-app apps/web-admin --ts --use-pnpm --import-alias @/ --src-dir --app --eslint --tailwind` - add a new next app (typescript, tailwind, eslint)

## Todo

- common
  - [ ] add utility libs (as new shared folder):
    - [x] prettier
    - [x] eslint
    - [ ] typescript
  - [ ] add shared validation library
  - [ ] add data immutalabity

- backend

- frontend:
  - [ ] import and use graphql schemas
  - [ ] zustand store - use selectors
  - [ ] zustand store - how to use: post\get state (isLoading, error etc)
  - [ ] add ENV param to use mocked data instead of api-server
  - [ ] move api request to separated module
