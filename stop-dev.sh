#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed. Install docker and/or docker-compose manually before running' >&2
  exit 1
fi

clean=$1

if [[ $clean == "yes" ]]; then
    echo "Stopping dev server and cleaning data"
     docker-compose -f docker-compose.dev.yml down -v
else
    echo "Stopping dev server without cleaning data"
    docker-compose -f docker-compose.dev.yml down
fi
