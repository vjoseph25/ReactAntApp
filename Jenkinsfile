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
  - name: podman
    image: quay.io/podman/stable
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
            container('podman') {
                //sh 'buildah --userns host --cap-add=CAP_SYS_ADMIN --storage-driver vfs --storage-opt vfs.ignore_chown_errors=true bud -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
                sh 'ls'
                sh 'podman build --isolation chroot --cap-add CAP_SYS_ADMIN --cgroup-manager=cgroupfs --device /dev/fuse --storage-driver=overlay --storage-opt "overlay.mount_program=/usr/bin/fuse-overlayfs" --net=host --security-opt seccomp=unconfined --security-opt label=disabled -t nexus-docker.apps.afs-demo.openshiftpoc.us/apps/react-ant-app /home/jenkins/agent/workspace/react-pipeline'
                sh 'podman images'
            }
        }
    }
  }
}