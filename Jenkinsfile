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
   tools {nodejs "node"}
  stages {
    stage('Prepare Code Base') {
      steps {
        container('node') {
          sh 'cd ..'
          sh 'ls -l'
          sh 'cd ..'
          sh 'ls -l'
          sh 'cd /home/jenkins/agent/workspace/react-pipeline'
          sh 'npm install'
      }
      }
    }
  }
}