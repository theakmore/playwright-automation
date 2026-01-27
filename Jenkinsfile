pipeline {
  agent any

  parameters {
    choice(name: 'Suite', choices: [
      'test:ui',
      'test:api',
      'test:mocks',
      'test:visual',
      'test:regression'
    ], description: 'Select test suite to run')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        sh "npm run ${params.Suite}"
      }
    }

    stage('Allure Report') {
      steps {
        sh 'npm run allure:gen || true'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
