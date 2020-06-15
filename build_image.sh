#!/bin/bash -e

containerid=$(buildah --userns keep-id from nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/nodejs:latest)
buildah run $containerid mkdir -p /user/src/app
buildah config --workingdir /usr/src/app $containerid
buildah copy $containerid __mocks__ /usr/src/app/__mocks__/
buildah copy $containerid public /usr/src/app/public/
buildah copy $containerid src /usr/src/app/src/
buildah copy $containerid .dockerignore /usr/src/app/
buildah copy $containerid Dockerfile /usr/src/app/
buildah copy $containerid Jenkinsfile /usr/src/app/
buildah copy $containerid package.json /usr/src/app/
buildah copy $containerid README.md /usr/src/app/
buildah run --net host $containerid npm install
buildah config --port 3000 --entrypoint '["npm", "start"]' $id
buildah commit $id nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app