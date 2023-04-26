param appName string
param planId string
param appInsightsInstrumentationKey string
param location string = resourceGroup().location
param tags object

resource webapp 'Microsoft.Web/sites@2021-01-01' = {
  name: appName
  location: location
  tags: tags
  kind: 'app,windows'  
  properties: {
    serverFarmId: planId
    httpsOnly: true
    siteConfig: {
      alwaysOn: false
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: 'InstrumentationKey=${appInsightsInstrumentationKey}'
        }
        {
          name: 'ApplicationInsightsAgent_EXTENSION_VERSION'
          value: '~2'
        }
      ]
      minTlsVersion: '1.2'
      netFrameworkVersion: 'v6.0'
      ipSecurityRestrictions: [
        {
          action: 'Allow'
          ipAddress: '58.107.140.222/32'
          name: 'Jake - Home'
          priority: 1
        }
      ]
    }
  }
}

output settings object = {
  name: webapp.name
  uri: 'https://${webapp.properties.defaultHostName}'
}
