pipeline {
   agent { 
    docker { 
        image 'mcr.microsoft.com/playwright:v1.32.0-focal' 
        } 
    }
   stages {

      stage('install playwright') {
         steps {
            // Depends on your language / test framework
            sh '''
            npm i -D @playwright/test
            npx playwright install
            '''
         }
      }

      stage('playwright help') {
         steps {
            // Depends on your language / test framework
            sh 'npx playwright test --help'
         }
      }
      stage('e2e-tests') {
         steps {
            // Depends on your language / test framework
            sh 'npx playwright test tests/UIBadUsertest.spec.js --project=chromium --list'
            sh 'npx playwright test tests/UIBadUsertest.spec.js --project=chromium'
            
         }
      }
   }
}