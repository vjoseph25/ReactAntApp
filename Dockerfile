FROM nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/nodejs:latest

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