pipeline {
    agent { label 'jenkins_agent' }

    environment {
        REPO_URL = 'https://github.com/Arm137039/web3.git'
        BRANCH = 'main'
        DEPLOY_DIR_SERVER = '/var/www/cinema.legerguihome.tech/server'
        DEPLOY_DIR_CLIENT = '/var/www/cinema.legerguihome.tech/client'
        SERVICE_NAME = 'cinema' // Nom de votre service systemd
    }

    stages {
        stage('Cloner le dépôt') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Installer les dépendances - Server') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Installer les dépendances - Client') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Construire le projet - Client') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Déployer le serveur') {
            steps {
                // Copier les fichiers du serveur vers le répertoire de déploiement
                sh """
                rsync -av --delete server/ ${DEPLOY_DIR_SERVER}/
                """
            }
        }

        stage('Déployer le client') {
            steps {
                // Copier les fichiers construits du client vers le répertoire de déploiement
                sh """
                rsync -av --delete client/build/ ${DEPLOY_DIR_CLIENT}/
                """
            }
        }

        stage('Redémarrer le service serveur') {
            steps {
                sh "sudo systemctl restart ${SERVICE_NAME}.service"
            }
        }

        stage('Recharger Nginx') {
            steps {
                sh "sudo systemctl reload nginx"
            }
        }
    }

    post {
        success {
            echo 'Déploiement réussi !'
        }
        failure {
            echo 'Le déploiement a échoué.'
        }
    }
}
