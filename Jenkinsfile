pipeline {
    agent {
        label 'dockerserver'
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:13.8.0-alpine' 
                    args '-p 3000:3000' 
                }
            }
            steps {
                sh 'npm install' 
            }
        }
    }
}