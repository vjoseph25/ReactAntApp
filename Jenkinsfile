pipeline {
  agent {
    kubernetes {
      inheritFrom 'jnlp'
      yamlMergeStrategy 'merge()'
      yaml """
apiVersion: v1
kind: Pod
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
              container('openjdk') {
                  withSonarQubeEnv('sonar') { // If you have configured more than one global server connection, you can specify its name  
                      sh 'echo ${scannerHome}'
                      sh '${scannerHome}/bin/sonar-scanner --version'
                  }
              }
          }
      }
    }
  
}