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
                sh 'cat /etc/containers/storage.conf'
                sh 'ls /etc/containers'
                sh 'dnf install fuse3-devel'
                sh 'buildah --storage-driver overlay --storage-opt ignore_chown_errors=true bud -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
            }
        }
    }
  }
}