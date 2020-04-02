FROM    node:10.16.3-alpine

WORKDIR /src
COPY    src ./
RUN     touch .env

# Delete yarn and node_modules, re-run npm install before deleting npm
RUN     rm -rf ./node_modules
RUN		npm install --unsafe-perm
RUN		rm -rf /usr/local/bin/npm /usr/local/bin/yarn /usr/local/bin/yarnpkg

# Setup healthcheck
COPY    healthcheck.js /etc/health/
HEALTHCHECK --interval=10s --timeout=3s CMD ["node", "/etc/health/healthcheck"]

# Expose the service port
EXPOSE  3000

CMD  ["node", "server.js"]
