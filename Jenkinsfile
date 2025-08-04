pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // --- GCP ---
        GCP_PROJECT_ID = 'model-parsec-465503-p3'
        GCP_CLUSTER_NAME = 'gke-secure-onboarding-system'
        GCP_ZONE = 'asia-southeast1-a'
        USE_GKE_GCLOUD_AUTH_PLUGIN = "True"

        // --- Checkout ---
        GIT_URL = 'https://github.com/alvarolt17/frontend-secure-onboarding-system'
        GIT_BRANCH = 'deploy/gke'

        // --- Image Build ---
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        GCR_HOSTNAME = 'gcr.io'
        IMAGE_NAME = 'frontend-secure-onboarding-system'

        // --- Build Arguments ---
        VITE_BACKEND_BASE_URL = "https://wondrdesktop.my.id"
        VITE_VERIFICATOR_BASE_URL = "https://verificator-secure-onboarding-system-441501015598.asia-southeast1.run.app"
        VITE_FIREBASE_API_KEY = "AIzaSyDAdFiBiQX28J_l6q-my4j6_hPQR_7eFyo" 
        VITE_FIREBASE_AUTH_DOMAIN = "AIzaSyDAdFiBiQX28J_l6q-my4j6_hPQR_7eFyo"
        VITE_FIREBASE_PROJECT_ID = "wondr-desktop-otp"
        VITE_FIREBASE_STORAGE_BUCKET = "wondr-desktop-otp.firebasestorage.app"
        VITE_FIREBASE_MESSAGING_SENDER_ID = "15939231912"
        VITE_FIREBASE_APP_ID = "1:15939231912:web:70eebf46fb94f5fc7a229d"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: GIT_URL, branch: GIT_BRANCH
            }
        }

        stage('Code Linting') {
            steps {
                sh """
                    npm install
                    npm run lint
                """
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    def fullImageName = "${GCR_HOSTNAME}/${GCP_PROJECT_ID}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh """
                        gcloud auth configure-docker ${GCR_HOSTNAME} --quiet

                        docker build \
                        --build-arg VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL} \
                        --build-arg VITE_VERIFICATOR_BASE_URL=${VITE_VERIFICATOR_BASE_URL} \
                        --build-arg VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY} \
                        --build-arg VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN} \
                        --build-arg VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID} \
                        --build-arg VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET} \
                        --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID} \
                        --build-arg VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID} \
                        -t $fullImageName -f Dockerfile .
                        docker push ${fullImageName}
                    """
                }
            }
        }

        stage('Deploy to GKE') {
            steps {
                sh """
                    sed -i 's|<CHANGE_IMAGE_TAG>|${IMAGE_TAG}|' k8s/deployment.yaml
                    
                    gcloud container clusters get-credentials ${GCP_CLUSTER_NAME} --zone ${GCP_ZONE} --project ${GCP_PROJECT_ID}

                    kubectl apply -f k8s/deployment.yaml
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline success! 🚀"
        }
        failure {
            echo "Pipeline failed! 💥"
        }
        always {
            cleanWs()
        }
    }
}
