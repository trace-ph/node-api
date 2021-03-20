FROM    node:10.16.3-alpine

WORKDIR /src
COPY    src ./
COPY    .env.example ./
RUN     touch .env
COPY    package.json package-lock.json ./

RUN     npm i --only=prod

RUN     rm -rf /usr/local/bin/yarn /usr/local/bin/npm /usr/local/bin/yarnpkg
COPY    healthcheck.js /etc/health/

HEALTHCHECK --interval=10s --timeout=3s CMD ["node", "/etc/health/healthcheck"]

# Expose the service port
EXPOSE  8080

CMD  ["node", "index.js"]