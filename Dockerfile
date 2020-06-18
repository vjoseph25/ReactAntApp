FROM node:14.4.0-alpine3.12

WORKDIR /app

COPY __mocks__ /app/__mocks__/
COPY public /app/public/
COPY src /app/src/
COPY .dockerignore /app/
COPY Dockerfile /app/
COPY Jenkinsfile /app/
COPY package.json /app/
COPY README.md /app/


RUN npm install

CMD ["npm", "start"]