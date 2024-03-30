FROM node:20.9.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm install -g ts-node

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]
