FROM    node:12.18.4-alpine

WORKDIR /app
COPY    src ./

RUN     touch .env
COPY    package.json ./

RUN     npm i --only=prod --unsafe-perm

RUN     rm -rf /usr/local/bin/yarn /usr/local/bin/npm /usr/local/bin/yarnpkg
COPY    healthcheck.js /etc/health/

HEALTHCHECK --interval=10s --timeout=3s CMD ["node", "/etc/health/healthcheck"]

# Expose the service port
EXPOSE  8080

CMD  ["node", "server.js"]
