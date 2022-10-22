ARG REMOTE_IMAGE=node:16-alpine

# --------------------------------------------------------------------------
FROM ${REMOTE_IMAGE} AS devDependencies
WORKDIR /app
COPY package.json yarn.* tsconfig*.json ./
COPY ./src ./src
RUN yarn install --production=false --frozen-lockfile

# --------------------------------------------------------------------------
FROM ${REMOTE_IMAGE} AS dependencies
WORKDIR /app
COPY package.json yarn.* ./
COPY ./src ./src
RUN yarn install --frozen-lockfile --production=true && yarn cache clean

# --------------------------------------------------------------------------
FROM ${REMOTE_IMAGE} AS build
WORKDIR /app
COPY --from=devDependencies /app/ .
COPY . .
RUN yarn build

# --------------------------------------------------------------------------
FROM ${REMOTE_IMAGE} AS runtime
COPY --chown=node:node --from=build /app/node_modules /home/node/app/node_modules/
COPY --from=build --chown=node:node /app/dist /home/node/app/dist/
CMD ["node", "/home/node/app/dist/external/service/server.js"]