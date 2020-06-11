FROM nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/nodejs:latest

ENV APP_HOME=/app \
    USER_NAME=build \
    USER_UID=1000 \
    HOME=/home/build

WORKDIR ${APP_HOME}
RUN chown -R ${USER_NAME}:0 ${APP_HOME}
RUN chmod g+rwx ${APP_HOME}

USER ${USER_NAME}

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