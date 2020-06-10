FROM nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/nodejs:latest

ENV APP_HOME=/app \
    USER_NAME=reactjs \
    USER_UID=2000


WORKDIR /app
RUN useradd -l -u ${USER_UID} -r -g 0 -s /sbin/nologin \
            -c "${USER_NAME} application user" ${USER_NAME}
RUN chown -R ${USER_NAME}:0 ${USER_HOME}
RUN chown -R ${USER_NAME}:0 ${APP_HOME}
RUN chmod g+rwx ${USER_HOME}
RUN chmod g+rwx ${APP_HOME}

USER reactjs

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