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
  serviceAccountName: jenkins-svc
  containers:
  - name: docker
    image: docker:latest
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
    - name: docker
    image: docker:latest
    command:
    - cat
    tty: true
  - name: node
    image: node:13.8.0-alpine
    command:
    - cat
    tty: true
  volumes:
    - name: docker-sock
      hostPath:
        path: /var/run/docker.sock
    - name: m2
      persistentVolumeClaim:
        claimName: m2
"""
}
   }
  stages {
    stage('Prepare Code Base') {
      steps {
        container('node') {
        sh 'npm install'
      }
      }
    }
    stage('Push') {
      steps {
        container('docker') {
          sh """
             docker build -t nexus.apps.afs-demo.openshiftpoc.us/repository/docker-hosted/react-ant-app:$BUILD_NUMBER .
          """
        }
      }
    }
  }
}