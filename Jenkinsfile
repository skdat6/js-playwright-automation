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
            bat '''
            npm i -D @playwright/test
            npx playwright install
            '''
         }
      }

      stage('playwright help') {
         steps {
            // Depends on your language / test framework
            bat 'npx playwright test --help'
         }
      }
      stage('e2e-tests') {
         steps {
            // Depends on your language / test framework
            bat 'npx playwright test tests/UIBadUsertest.spec.js --project=chromium --list'
            bat 'npx playwright test tests/UIBadUsertest.spec.js --project=chromium'
            
         }
      }
   }
}