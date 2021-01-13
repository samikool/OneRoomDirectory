pipeline {
    agent any
    environment{
        CI = 'true'
    }
    options {
        skipStagesAfterUnstable()
    }
    stages {   
        stage('Build Frontend') {
            steps {
                sh """
                    echo "not sure what todo here rn..."
                    #npm install --prefix frontend
                """
            }
        }
        stage('Test Frontend'){
            steps{
                //eventually ill have a way to test
                echo 'testing frontend...' //need echo or build fails
            } 
        }
        stage('Build Backend') {
            steps {
                sh 'node --check backend/*.js'
                sh 'npm install'
            }
        }
        stage('Test Backend'){
            steps{
                //eventually ill have a way to test
                echo 'testing backend...'
            }
        }
        stage('Push to Staging'){
            when {
                not {branch 'staging'}
                not {branch 'production'}
                not {branch 'master'}
                not {tag 'release*'}
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'Github-User-Token', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh """
                            git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/samikool/OneRoomDirectory.git HEAD:staging
                        """
                    }
                }
        }
        stage('Deploy Frontend to Staging'){
            when {
                branch 'staging'
            }
            steps{
               sh  """
                    npm run build:staging --prefix frontend
                    sudo rm -rf /srv/http/oneRoomDirectory-staging/*
                    sudo cp frontend/build/* -rf /srv/http/oneRoomDirectory-staging/
                    sudo echo "frontend deployed..."
                """
            }
        }
        stage('Deploy Backend to Staging'){
            when {
                branch 'staging'
            }
            steps{
               sh  """
                    sudo pm2 stop /backends/oneRoomDirectory-staging/ecosystem.config.js 1>/dev/null

                    sudo rm -rf /backend/oneRoomDirectory-staging/*
                    sudo cp backend/*.js backend/package.json /backends/oneRoomDirectory-staging/ -rf
                    sudo cp /backends/env/oneRoomDirectory/.env /backends/oneRoomDirectory-staging/
                    sudo npm --prefix /backends/oneRoomDirectory-staging/ install
                    
                    cd /backends/oneRoomDirectory-staging
                    sudo pm2 start ecosystem.config.js --env staging 1>/dev/null
                """
            }
        }
        stage('Deploy Frontend to Production'){
            when { 
                tag 'release-v*'
            }
            steps {
                sh  """
                    npm install --prefix frontend
                    npm run build --prefix frontend
                    sudo rm -rf /srv/http/oneRoomDirectory/*
                    sudo cp frontend/build/* -rf /srv/http/oneRoomDirectory/
                    sudo echo "frontend deployed..."
                """
            }
        }
        stage('Deploy Backend to Production'){
            when {
                tag 'release-v*'
            }
            steps {
                sh  """
                    sudo pm2 stop /backends/oneRoomDirectory/ecosystem.config.js 1>/dev/null

                    sudo rm -rf /backend/oneRoomDirectory/*
                    sudo cp backend/*.js backend/package.json /backends/oneRoomDirectory/ -rf
                    sudo cp /backends/env/oneRoomDirectory/.env /backends/oneRoomDirectory/
                    sudo npm --prefix /backends/oneRoomDirectory/ install
                    
                    cd /backends/oneRoomDirectory
                    sudo pm2 start ecosystem.config.js --env production 1>/dev/null
                """
            }
        }
    }
}