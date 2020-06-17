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
    image: node:14.4.0-alpine3.12
    command:
    - cat
    tty: true
  - name: buildah
    image: quay.io/buildah/stable
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
                //sh 'buildah --userns host --cap-add=CAP_SYS_ADMIN --storage-driver vfs --storage-opt vfs.ignore_chown_errors=true bud -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
                sh 'buildah --userns host --cap-add=CAP_SETUID --cap-add=CAP_SETGID --format=docker --storage-driver vfs --storage-opt vfs.ignore_chown_errors=true --security-opt seccomp=unconfined --security-opt apparmor=unconfined bud -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
                sh 'buildah images'
            }
        }
    }
  }
}