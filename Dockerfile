FROM    node:10.16.3-alpine

WORKDIR /src
COPY    src ./
RUN     touch .env

RUN     rm -rf /usr/local/bin/yarn /usr/local/bin/npm /usr/local/bin/yarnpkg
COPY    healthcheck.js /etc/health/

HEALTHCHECK --interval=10s --timeout=3s CMD ["node", "/etc/health/healthcheck"]

# Expose the service port
EXPOSE  80

CMD  ["node", "index.js"]