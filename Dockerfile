ARG REMOTE_IMAGE=node:16-alpine

FROM ${REMOTE_IMAGE}

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile --production=true && yarn cache clean

COPY src src

RUN yarn build

EXPOSE 80

CMD yarn start
