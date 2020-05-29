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
    image: node:14.3.0-alpine3.11
    command:
    - cat
    tty: true
"""
}
   }
  stages {
    stage('Prepare Code Base') {
      steps {
        container('node') {
          sh 'whoami'
          sh 'npm -v'
          sh 'chown -R 1000540000:0 "/.npm"'
          sh 'npm install'
      }
      }
    }
  }
}