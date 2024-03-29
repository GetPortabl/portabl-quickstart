DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_YML := --file docker-compose.yml
ifneq ("$(wildcard docker-compose.local.yml)","")
DOCKER_COMPOSE_YML += --file docker-compose.local.yml
endif

SUCCESS_MESSAGE := "✅ successfully executed"

compose_libs := portabl-next 
ifeq ($(integration), sync)
	compose_libs += $(integration)-api
endif

.PHONY: up
up:
	$(DOCKER_COMPOSE) \
		$(DOCKER_COMPOSE_YML) \
		$@ --build --detach --remove-orphans \
		$(compose_libs)
	@echo $(SUCCESS_MESSAGE)

.PHONY: down 
down:
	$(DOCKER_COMPOSE) \
		$(DOCKER_COMPOSE_YML) \
		$@ \
		$(compose_libs)
	@echo $(SUCCESS_MESSAGE)

.PHONY: logs
logs:
	$(DOCKER_COMPOSE) \
		$@ --follow \
		$(compose_libs)

.PHONY: stop build
stop build:
	$(DOCKER_COMPOSE) \
		$(DOCKER_COMPOSE_YML) \
		$@ \
		$(compose_libs)
