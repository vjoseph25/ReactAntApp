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
    securityContext:
      privileged: true
"""
    }
  }
  environment {
    HOME = '/home/jenkins/agent/workspace/react-pipeline'
    CI = true
    //DOCKER_CREDS = credentials('docker-credentials')
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
                sh 'buildah bud -t cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
                sh 'ls'
                //sh 'podman build --isolation chroot --cap-add CAP_SYS_ADMIN --cgroup-manager=cgroupfs --storage-driver=vfs --net=host --security-opt seccomp=unconfined --security-opt label=disabled -t podman-react /home/jenkins/agent/workspace/react-pipeline'
                //sh 'podman login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW docker.io'
                //sh 'podman push podman-react docker://docker.io/vjoseph25/podman-react'
                sh 'buildah images'
            }
        }
    }
/*
    stage('Aqua scanning') {
      steps {
        container('aqua') {

        }
      }
    }

    stage('Push container') {
      steps {
        container('buildah') {
          sh 'buildah login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW docker.io'
          sh 'buildah push buildah-react docker://docker.io/vjoseph25/buildah-react'
        }
      }
    }*/
  }
}