FROM docker.io/node:13.8.0-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]