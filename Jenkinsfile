#!groovy

//TODO: PUBLISH TEST RESULTS TO SONAR
node ('amplify.jenkins.slave.1.3'){
    // use a unique docker-compose project name to avoid conflicts for concurrent builds
    env.COMPOSE_PROJECT_NAME = sh(returnStdout: true, script: 'hostname').trim()
    try {
        stage 'Build'
          sh 'yes | docker login -p amplify-pass -u amplify cgbudockerdev1.us.oracle.com:7755'
          checkout scm
          sh 'chmod 755 ./gradlew'
          sh 'docker pull cgbudockerdev1.us.oracle.com:7755/amplify/ui-component/test'
          sh "./gradlew ojetOverlay buildDocker"

        stage 'Run Unit Tests'
            sh 'docker run --name ringette-web-unit-$BUILD_TAG  -i cgbudockerdev1.us.oracle.com:7755/amplify/ui-component/ringette-web/test'
          //copy the reports out
          sh 'docker cp ringette-web-unit-$BUILD_TAG:/usr/src/app/reports ./reports'
        stage 'Publish Test Results'
          step([$class: 'hudson.plugins.checkstyle.CheckStylePublisher', pattern: 'reports/checkstyle.xml'])
//cobertura publisher not supported by pipeline right now
//          step([$class: 'hudson.plugins.cobertura.CoberturaPublisher', pattern: 'reports/coverage/cobertura.xml'])
          publishHTML (target: [ allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/coverage/report-html', reportFiles: 'index.html', reportName: "Code Coverage Report" ])
          step([$class: 'JUnitResultArchiver', testResults: 'reports/junit/**/*.xml'])
        stage 'Stop Docker Container'
    	  sh 'docker rm -f  ringette-web-unit-$BUILD_TAG'
        stage 'Publish results to SonarQube'
            def deployable_branches = ["master"]
            def sonar_host_url = props()
            if(deployable_branches.contains(env.BRANCH_NAME)) {
                echo "Publishing reports to central SonarQube"
                sh "./gradlew sonarqube --debug"
            }
            else if(fileExists("build-vars.properties")) {
                sh "./gradlew sonarqube -Dsonar.host.url=${sonar_host_url} -Dsonar.login=admin -Dsonar.password=admin"
                echo "Publishing reports to personal SonarQube ${sonar_host_url}"
            }
        stage 'Archive Reports'
            step([$class: 'ArtifactArchiver', artifacts: 'reports/coverage/cobertura.xml, reports/coverage/report-html/*, reports/lcov.info, reports/junit/**/*.xml', fingerprint: true])
            if (currentBuild.result != 'SUCCESS') {
                emailNotification()
            }
    } catch (e) {
      sh 'docker rm -f  ringette-web-unit-$BUILD_TAG'
      currentBuild.result = "FAILED"
      emailNotification()
      throw e
    }
}

def emailNotification() {
  emailext (
      subject: "${currentBuild.result}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: "${currentBuild.result}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]': "+
        "Check console output at: ${env.BUILD_URL}",
      recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider'], [$class: 'FailingTestSuspectsRecipientProvider'], [$class: 'FirstFailingBuildSuspectsRecipientProvider'], [$class: 'UpstreamComitterRecipientProvider']]
    )
}

def props() {
         def matcher = readFile('build-vars.properties') =~ 'sonar_host_url=(.+)'
         matcher ? matcher[0][1] : null
}
