# Docker related  information

## TODO

- [ ] Add a script to /docker-entrypoint-initdb.d/ [info](https://stackoverflow.com/questions/26598738/how-to-create-user-database-in-script-for-docker-postgres)
- [ ] Add docker-compose.dev.yml for development with
  - volumes:
    - ./scripts/postgres:/docker-entrypoint-initdb.d
- [ ] Add docker-compose.ci.yml for production
