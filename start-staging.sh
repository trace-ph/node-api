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

source ./.env

trimmedDomain=$(echo "$DOMAIN_NAME" | sed 's:/*$::')
domains=($trimmedDomain)
fqdn="http:\/\/$trimmedDomain"

cp ./data/nginx-staging/app.tmpl ./data/nginx-staging/app.conf

sed -i -e "s/{{domain}}/$trimmedDomain/g" ./data/nginx-staging/app.conf

echo "-------BUILDING PROD WEB API----------"
docker-compose -f ./docker-compose.staging.yml build --no-cache

echo "-------STARTING API SERVICE----------"
docker-compose -f ./docker-compose.staging.yml up -d
