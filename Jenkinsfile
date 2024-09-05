pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'nqquy21/vou-frontend'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/nqq203/vou-frontend.git'
            }
        }
        stage('Build And Push') {
            steps {
                script {
                    echo 'About to start Docker registry session...'
                    try {
                        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            echo 'Registry session started. Starting Docker build...'
                            def builtImage = docker.build(DOCKER_IMAGE)
                            echo 'Image built successfully. Pushing...'
                            builtImage.push()
                            echo 'Image pushed successfully.'
                            echo 'Completed Docker build and push session.'
                        }
                    } catch (Exception e) {
                        echo "Error during Docker operations: ${e.message}"
                        throw e
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                 script {
                    if (isUnix()) {
                        sh '''
                        # Find any container using port 3000 and stop it
                        CONTAINER_ID=$(docker ps --filter "publish=3000" -q)
                        if [ ! -z "$CONTAINER_ID" ]; then
                            echo "Stopping container using port 3000: $CONTAINER_ID"
                            docker stop $CONTAINER_ID
                        else
                            echo "No container to stop on port 3000"
                        fi
                        
                        # Run the new Docker container
                        echo "Starting new container..."
                        docker run -p 3000:3000 -d $DOCKER_IMAGE
                        '''
                    } else {
                        bat '''
                        FOR /F "tokens=*" %%i IN ('docker ps --filter "publish=3000" -q') DO (
                            IF NOT "%%i"=="" (
                                ECHO Stopping container using port 3000: %%i
                                docker stop %%i
                            ) ELSE (
                                ECHO No container to stop on port 3000
                            )
                        )

                        ECHO Starting new container...
                        docker run -p 3000:3000 -d %DOCKER_IMAGE%
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build succeeded.'
        }
        failure {
            echo 'Build failed.'
        }
    }
}