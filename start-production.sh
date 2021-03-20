#!/bin/bash
source .env

if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: NPM is not installed. Install NodeJS manually or use nvm before running' >&2
  exit 1
fi

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed. Install docker and/or docker-compose manually before running' >&2
  exit 1
fi


echo "-------BUILDING PROD WEB API----------"
docker-compose -f ./docker-compose.yml build --no-cache

echo "-------STARTING API SERVICE----------"
docker-compose -f ./docker-compose.yml up -d mongo api

echo  "-------STARTING NGINX/CERTIFICATE SERVICE----------"
source ./init-letsencrypt.sh