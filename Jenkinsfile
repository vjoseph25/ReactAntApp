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
    HOME = '.'
    CI = true
  }
   
  stages {
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
    }

    stage('Build container') {
        steps {
            container('buildah') {
                sh 'buildah bud -f Dockerfile -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app .'
            }
        }
    }
  }
}