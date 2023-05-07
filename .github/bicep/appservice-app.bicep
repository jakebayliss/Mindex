param appName string
param planId string
param appInsightsInstrumentationKey string
param apiUrl string
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
        {
          name: 'BASE_API_URL'
          value: apiUrl
        }
      ]
      minTlsVersion: '1.2'
      netFrameworkVersion: 'v7.0'
    }
  }
}

output settings object = {
  name: webapp.name
  uri: 'https://${webapp.properties.defaultHostName}'
}
