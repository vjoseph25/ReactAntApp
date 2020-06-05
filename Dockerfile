FROM nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/nodejs:latest

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]