ENV_FILE=src/.env
DC=docker-compose

up:
	${DC} --env-file ${ENV_FILE} up -d --build
down:
	${DC} --env-file ${ENV_FILE} down