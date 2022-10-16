ARG REMOTE_IMAGE=node:16-alpine

FROM ${REMOTE_IMAGE}

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN npm install typescript@4.8.4 -g && yarn install --frozen-lockfile --production=true && yarn cache clean

COPY src src

RUN yarn build

EXPOSE 80

CMD yarn start
