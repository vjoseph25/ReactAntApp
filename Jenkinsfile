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
          sh 'npm install npm@6.14.5 -g'
          sh 'npm install'
      }
      }
    }
  }
}