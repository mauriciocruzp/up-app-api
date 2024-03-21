FROM node:20.9.0

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g ts-node

EXPOSE 3001

CMD [ "ts-node", "src/index.ts" ]
