# menu-api

## Installation

```bash
# install the dependencies
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run dev

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Additional

- pn dlx @nestjs/cli g res modules/users - add new 'Users' resource

## TODO

- [x] cast `ID`s to one type (string or integer)
- [ ] revise the prisma data structure
  - [ ] `cart` model should contain only `products` field
  - [ ] `order` model should contain only `lines` field
  - [ ] maybe `order` model should have `lines` as jsonb
- [ ] add error handling
- [ ] move `types` to a separed lib
- [ ] use GraphQL types for inputData in front-end. Save ts-types files to upper folder\lib
- [x] split `order` model to `order` and `cart` models
