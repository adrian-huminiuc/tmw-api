-include .env
.DEFAULT_GOAL:=help
.PHONY: init start stop tests copy-env logs migrate destroy
DOCKER_COMPOSE_AVAILABLE := $(shell docker compose 2>/dev/null)

init: req copy-env ## Init the project
	docker compose build --no-cache --progress plain

start: req stop ## Will start the docker containers
	@if ! [ -f .env ]; then echo "No env file. Run make copy-env or make init"; exit 1; fi
	docker compose up -d

stop: ## Will stop docker containers that are currently running
	docker compose down

copy-env:
	@if ! [ -e .env ]; then cp .env.example .env; fi

build-verbose: ## docker compose build but with the progress in plain format #debug
	docker compose build --no-cache --progress plain

tests:
	@docker compose exec api env DB_NAME=quiz-db-test npm run typeorm schema:drop
	@docker compose exec api env DB_NAME=quiz-db-test npm run typeorm migration:run
	@docker compose exec api npm run test

seeds: ## Will reload seeds into the local db
	@docker compose exec api npm run typeorm schema:drop
	@docker compose exec api npm run typeorm migration:run
	@docker compose exec api npm run seed

logs:  ## Show logs from the underlying containers (useful when running the app in the background)
	@docker compose logs --follow --since 1m

destroy: ## Will remove ALL docker containers,volumes and images so you can start fresh
	@docker compose down
	@docker rm -f $(shell docker ps -a -q) 2>/dev/null || echo 'Already destroyed containers'
	@docker volume rm $(shell docker volume ls -q) 2>/dev/null || echo 'Already destroyed volumes'
	@docker rmi $(shell docker images -a -q) || echo 'Already destroyed images'

req:
ifndef DOCKER_COMPOSE_AVAILABLE
    $(error "docker compose not installed @see https://docs.docker.com/compose/install/compose-plugin/")
endif

help: ## Prints the help about targets.
	@printf "Usage:             make [\033[34mtarget\033[0m]\n"
	@printf "Default:           \033[34m%s\033[0m\n" $(.DEFAULT_GOAL)
	@printf "Targets:\n"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf " \033[34m%-17s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
