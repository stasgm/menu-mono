# menu-api

## Configuration

copy `.env.example` to `.env` and replace parameters if needed.

## Installation

```bash
# install the dependencies
$ pnpm install
```

```bash
# run the database in docker container
$ pnpm run docker:db
```

```bash
# run the database migratation
$ pnpm run migrate:dev
```

```bash
# seed the database
$ pnpm run seed
```

```bash
# generate graphql types
$ pnpm run graphql:generate
```

## Running the app

```bash
# development
$ pnpm run dev

# debug mode
$ pnpm run start:debug

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
- [x] revise the prisma data structure
  - [x] `cart` model should contain only `products` field
  - [ ] `order` model should contain only `lines` field
  - [ ] maybe `order` model should have `lines` as jsonb
- [ ] add error handling
- [ ] move `types` to a separed lib
- [ ] use GraphQL types for inputData in front-end. Save ts-types files to upper folder\lib
- [x] split `order` model to `order` and `cart` models
- [ ] add bullmq module for user registration\confirmation
