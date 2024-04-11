FROM node:21.7.2-alpine

RUN mkdir /app

WORKDIR /app

RUN apk update && apk add --no-cache dumb-init

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD [ "dumb-init", "node", "dist/src/index.js" ]
