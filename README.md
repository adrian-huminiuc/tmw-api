## Description

Example project a small quiz server. 

Uses: Typescript, NestJs, Typeorm, Jest, MySql 

## Installation

---

# Requirements to run locally

1. Docker
2. docker compose as a plugin  https://docs.docker.com/compose/install/compose-plugin/

---

# How to start

```shell
make init
make start
make seeds 
```

# Stop the app

```shell
make stop
```

# Check logs

```shell
make logs
```

# Run tests

```shell
make tests
```

# If you wish to run the app without docker (not recommend)

You will need to export all of the environment variables from the .env.example


