pipeline {
  agent {
    kubernetes {
      label 'react-app'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: default
  containers:
  - name: node
    image: nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/nodejs
    command:
    - cat
    tty: true
  - name: buildah
    image: nexus-docker.apps.afs-demo.openshiftpoc.us/opensource/buildah
    command:
    - cat
    tty: true
"""
    }
  }
  environment {
    HOME = '/home/jenkins/agent/workspace/react-pipeline'
    CI = true
  }
   
  stages {/*
    stage('Prepare Code Base') {
      steps {
        container('node') {
          sh 'npm install'
      }
      }
    }

    stage('Testing') {
      steps {
        container('node') {
          sh 'npm test'
      }
      }
    }*/

    stage('Build container') {
        steps {
            container('buildah') {
                sh 'whoami'
                sh 'cat /etc/passwd'
                //sh 'buildah --userns host --cap-add=CAP_SYS_ADMIN --storage-driver vfs --storage-opt vfs.ignore_chown_errors=true bud -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
                sh 'containerid=$(buildah from node:14.4.0-alpine3.12)'
                sh 'buildah run $containerid mkdir -p /user/src/app'
                sh 'buildah config --workingdir /usr/src/app $containerid'
                sh 'buildah copy $containerid __mocks__ /usr/src/app/__mocks__/'
                sh 'buildah copy $containerid public /usr/src/app/public/'
                sh 'buildah copy $containerid src /usr/src/app/src/'
                sh 'buildah copy $containerid .dockerignore /usr/src/app/'
                sh 'buildah copy $containerid Dockerfile /usr/src/app/'
                sh 'buildah copy $containerid Jenkinsfile /usr/src/app/'
                sh 'buildah copy $containerid package.json /usr/src/app/'
                sh 'buildah copy $containerid README.md /usr/src/app/'
                sh 'buildah run --net host $containerid npm install'
                sh 'buildah config --port 3000 --entrypoint \'[\"npm\", \"start\"]\' $id'
                sh 'buildah commit $id nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app'
                sh 'buildah images'
            }
        }
    }
  }
}