FROM node:21.5.0

WORKDIR /usr/src/simple-websocket
COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
