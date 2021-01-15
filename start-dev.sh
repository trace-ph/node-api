#!/bin/bash

if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: NPM is not installed. Install NodeJS manually or use nvm before running' >&2
  exit 1
fi

# Go to source code root
cd src

# Clean up old modules
rm -rf node_modules
# Install fresh modules
npm install

cd ..

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed. Install docker and/or docker-compose manually before running' >&2
  exit 1
fi

docker-compose -f ./docker-compose.dev.yml up -d