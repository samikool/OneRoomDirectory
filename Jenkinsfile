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
                    npm install --prefix frontend
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
                sh 'node --check *.js'
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
                    rm -rf /srv/http/oneRoomDirectory-staging/*
                    cp frontend/build/* -rf /srv/http/oneRoomDirectory-staging/
                    echo "frontend deployed..."


                """
            }
        }
        stage('Deploy Backend  to Staging'){
            when {
                branch 'staging'
            }
            steps{
               sh  """
                    pm2 stop /backend/oneRoomDirectory-staging/ecosystem.config.js 1>/dev/null
                    rm -rf /backend/oneRoomDirectory-staging/*
                    cp backend/*.js backend/package.json /backend/oneRoomDirectory-staging/ -rf
                    npm --prefix /backend/oneRoomDirectory-staging/ install
                    pm2 start /backend/oneRoomDirectory-staging/ecosystem.config.js --env staging 1>/dev/null
                """
            }
        }
        stage('Deploy to production'){
            when { 
                branch 'production'
            }
            steps {
                sh '/discordbot/scripts/production-deploy.sh'
            }
        }
    }
}