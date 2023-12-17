# RABBITMQ + TYPESCRIPT PROJECT

## Setup

1. install dependencies

`npm install`

2. create .env file as a .env.example guide

3. create docker container to host rabbitmq server

`docker compose up -d`

## Run project

- To run the api use:
  `npm run dev`

- To run the consumers use:
  `npm run dev:consumers`

- To build project use:
  `npm run build`

## API

- GET `/runProcessOne`. Send a message to queue processOne

- GET `/runProcessTwo`. Send a message to queue processOne

## Author

~ Alejandro Cárdenas
