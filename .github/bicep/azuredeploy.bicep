// project name
@minLength(3)
@maxLength(21)
@description('Name of this project')
param projectName string = 'mindex'

// environment name like dev, staging, prod
@allowed([
  'dev'
  'uat'
  'prod'
])
@description('The environment that this project is being deployed to. (eg. Dev, Test, Prod)')
param environmentName string

@description('The admin user of the SQL Server')
param sqlAdministratorLogin string = projectName

@description('The password of the admin user of the SQL Server')
@secure()
param sqlAdministratorLoginPassword string

@description('Specifies region of all resources.')
param location string = resourceGroup().location

@description('Date timestamp of when this deployment was run - defaults to UtcNow()')
param lastDeploymentDate string = utcNow('yyMMddHHmmss')

var tags = {
  project: projectName
  lastDeploymentDate: lastDeploymentDate
}

module appInsights 'appinsights.bicep' = {
  name: '${environmentName}-${projectName}-ai'
  scope: resourceGroup()
  params: {
    appInsightsName: '${environmentName}-${projectName}-ai'
    location: location
    tags: tags
  }
}

module sql 'sql.bicep' = {
  name: '${environmentName}-${projectName}-sql'
  scope: resourceGroup()
  params: {
    sqlServerName: '${environmentName}-${projectName}-sql'
    sqlAdministratorLogin: sqlAdministratorLogin
    sqlAdministratorLoginPassword: sqlAdministratorLoginPassword
    location: location
    tags: tags
  }
}

var sqlConnectionString = 'Server=tcp:${sql.outputs.settings.fullyQualifiedDomainName},1433;Initial Catalog=${sql.outputs.settings.databaseName};Persist Security Info=False;User ID=${sqlAdministratorLogin};Password=${sqlAdministratorLoginPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;'

resource plan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: '${environmentName}-${projectName}-app-plan'
  location: location
  kind: 'windows'
  tags: tags
  sku: {
    name: 'F1'
  }
  properties: {}
}

module webapi 'appservice-api.bicep' = {
  name: '${environmentName}-${projectName}-api'
  scope: resourceGroup()
  params: {
    appName: '${environmentName}-${projectName}-api'
    planId: plan.id
    appInsightsInstrumentationKey: appInsights.outputs.settings.instrumentationKey
    sqlConnectionString: sqlConnectionString
    location: location
    tags: tags
  }
}

module webapp 'appservice-app.bicep' = {
  name: '${environmentName}-${projectName}-app'
  scope: resourceGroup()
  params: {
    appName: '${environmentName}-${projectName}-app'
    planId: plan.id
    appInsightsInstrumentationKey: appInsights.outputs.settings.instrumentationKey
    apiUrl: webapi.outputs.settings.url
    location: location
    tags: tags
  }
}
