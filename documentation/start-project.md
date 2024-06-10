# How to start the project using Node Package Manager

Some scripts have been created in order to use Node Package Manager commands to do everything.

To start the application, you can use the following commands

```bash
npm run docker:start
```

A few commands are available to stop, restart, or reset the container:

```bash
npm run docker:stop
npm run docker:restart
npm run docker:reset
```

The `docker:reset` command will stop and remove the containers and the volumes, and then start the containers again.

## Interacting with the containers

To install new packages, you can use the following command:

```bash
npm run docker:install
```

> It is the equivalent of using `npm install` in the container.

---

# How to start the project (without using Node Package Manager)

- Start the project with Docker Compose:

```bash
docker compose up -d
```

## Aliases

```bash
alias @npm="docker compose exec apollo-server npm"
```

This commands allows to use `@npm` instead of `docker compose exec apollo-server npm`.