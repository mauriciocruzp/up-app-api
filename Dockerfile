FROM node:20.9.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g ts-node

COPY package.json ./
COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "start" ]
