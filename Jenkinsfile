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
    - cat
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
  - args:
    - /usr/bin/falco
    - -K
    - eyJhbGciOiJSUzI1NiIsImtpZCI6ImJwdERzUFdtamFUUTNuWHJJaEtPcThmM3ZYZDhiejdIS0F0TUNCc0pqV0kifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJjaWNkLWRlbW8iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlY3JldC5uYW1lIjoiZGVmYXVsdC10b2tlbi0yZ3NmZyIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNmVhMzQ2NGYtOTI5Ny00YTQwLWI0ZDctZjI3YWY3M2Q4NTE0Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmNpY2QtZGVtbzpkZWZhdWx0In0.jKUo2tUwID9a9HUvVxRCN4hcxte0VfaKLK09eo9-O9Y2EGiutUcyfWmGwWc3VrN7QtNycQjjaoh6S7Hu36ATUHXWcQYDLHlfLH7RqvztvfloU_FlEsLZXpXcui1-zaaU6OjDPn1MUv595KrfbZ5RZASN4_zffbcS9FOXY6i2L8Wtg4SaHHTtD8SDtEoJ4NDrtpZ1H1uOyQPFs0e5uOh1kVwRmYJR33yqQ0Norw_O-j-z2fC7cnLWcBVJ17F-36hpciNONSK7ew9vD9tvhmd8a7C3L6ZLNApm6mm9EPrlw4PdhfCKuuoyK4Emby4iLNHa_qDn5vRgPYdPwR1_1s5nXg
    - -k
    - https://api.afsopenshiftdemo.afsopenshiftdemo.us:6443
    - -pk
    name: falco-no-driver
    image: cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/opensource/falco-no-driver:0.23.0
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
        sh 'anchore engineCredentialsId: \'anchore\', engineurl: \'http://10.128.2.150:8228/v1\', name: \'cicd-demo-nexus-docker.apps.afsopenshiftdemo.afsopenshiftdemo.us/repository/nexus-docker/apps/react-ant-app\''
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