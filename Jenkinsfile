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
  - name: falco-driver-loader
    image: cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/opensource/falco-driver-loader:0.23.0
    command:
    # - cat
    tty: true
    securityContext:
      privileged: true
    volumeMounts:
    - mountPath: /root/.falco
      name: root
    - mountPath: /host/etc
      name: etc-fs
      readOnly: true
    - mountPath: /host/proc
      name: proc-fs
      readOnly: true
    - mountPath: /host/boot
      name: boot-fs
      readOnly: true
    - mountPath: /host/lib/modules
      name: lib-modules
    - mountPath: /host/usr
      name: usr-fs
  - name: falco-no-driver
    image: cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/opensource/falco-no-driver:0.23.0
    command:
    # - cat
    tty: true
  volumes:
  - hostPath:
      path: /proc
      type: ""
    name: proc-fs
  - hostPath:
      path: /boot
      type: ""
    name: boot-fs
  - hostPath:
      path: /lib/modules
      type: ""
    name: lib-modules
  - hostPath:
      path: /usr
      type: ""
    name: usr-fs
  - hostPath:
      path: /etc
      type: ""
    name: etc-fs
  - hostPath:
      path: /root/.falco
      type: ""
    name: root

"""
    }
  }
  environment {
    HOME = '/home/jenkins/agent/workspace/react-pipeline'
    CI = true
    NEXUS_CREDS = credentials('nexus')
  }
  
  stages {
    /*
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
    */
    stage('Sysdig falco scan') {
      steps {
        container('falco-no-driver') {
          sh 'falco --help'
        }
      }
    }
    /*
    stage('Push container') {
      steps {
        container('buildah') {
          sh 'buildah login -u $NEXUS_CREDS_USR -p $NEXUS_CREDS_PSW cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us'
          sh 'buildah push --format=docker cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/apps/react-ant-app'
        }
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
    }*/
  }
}