FROM node:20.12-alpine

RUN mkdir -p /usr/src/app

RUN apk update && apk add --no-cache dumb-init

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD [ "dumb-init", "node", "dist/src/index.js" ]
