pipeline {
  agent {
    kubernetes {
      label 'linux-x86_64'
      inheritFrom 'jnlp'
      yamlMergeStrategy merge()
      yaml """
apiVersion: v1
kind: Pod
name: jenkins-agent
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: jenkins-jenkins-helm
  containers:
  - name: node
    image: node:14.4.0-alpine3.12
    command:
    - cat
    tty: true
  - name: openjdk
    image: openjdk:11
    command:
    - cat
"""
    }
  }
  environment {
    HOME = '/home/jenkins/agent/workspace/test'
    CI = true
    NEXUS_CREDS = credentials('nexus')
    scannerHome = tool 'sonar'
  }
    stages {

      stage('SonarQube analysis') {
          steps {
              container('jnlp') {
                  withSonarQubeEnv('sonar') { // If you have configured more than one global server connection, you can specify its name  
                      sh 'ls'
                      sh '${scannerHome}/bin/sonar-scanner \
                      -Dsonar.projectKey=react-ant-app \
                      -Dsonar.sources=./src/components,./src/App.css,./src/App.js,\
                      ./src/index.css,./src/index.js,./src/logo.svg,\
                      ./src/serviceWorker.js,./src/setupTests.js \
                      -Dsonar.tests=./src/__tests__/App.test.js'
                  }
              }
          }
      }
    }
  
}