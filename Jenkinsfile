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
  - name: kubectl
    image: cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/opensource/kubectl:1.17.5
    command:
    - cat
    tty: true
"""
    }
  }
  environment {
    HOME = '/home/jenkins/agent/workspace/react-pipeline'
    CI = true
    NEXUS_CREDS = credentials('nexus')
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
                sh 'buildah bud -t cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/apps/react-ant-app:1.0 /home/jenkins/agent/workspace/react-pipeline/Dockerfile'
                sh 'ls'
                //sh 'podman build --isolation chroot --cap-add CAP_SYS_ADMIN --cgroup-manager=cgroupfs --storage-driver=vfs --net=host --security-opt seccomp=unconfined --security-opt label=disabled -t podman-react /home/jenkins/agent/workspace/react-pipeline'
                //sh 'podman login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW docker.io'
                //sh 'podman push podman-react docker://docker.io/vjoseph25/podman-react'
                sh 'buildah images'
            }
        }
    }
    
    stage('Push container') {
      steps {
        container('buildah') {
          sh 'buildah login -u $NEXUS_CREDS_USR -p $NEXUS_CREDS_PSW cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us'
          sh 'buildah push --format=docker cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/apps/react-ant-app:1.0'
        }
      }
    }
    
    stage('Anchore') {
      steps {
        anchore engineCredentialsId: 'anchore', engineRetries: '600', engineurl: 'http://10.129.2.63:8228/v1', name: 'anchore_images'
      }
    }

    stage('Deploy container') {
      steps {
        container('kubectl') {
          withKubeConfig([credentialsId: 'serviceaccount-token', serverUrl: 'https://api.afsopenshiftdemo.afsopenshiftdemo.us:6443']) {
            sh 'kubectl apply -f react-ant-deployment.yaml'
          }
        }
      }
    }
  }
}