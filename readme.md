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

## Additional libs

- Zustand - state managment tool (<https://docs.pmnd.rs/zustand/getting-started/introduction>)
- Immer - immutability tool (<https://immerjs.github.io/immer/>)

## How to

- pnpm create next-app new-next-app - create a new nextjs app
- pnpm up -r -i --workspace api - update dependencies

## Todo

- add utility libs (as new shared folder):
  - prettier
  - eslint
  - typescript
- add shared validation library
- add data immutalabity
