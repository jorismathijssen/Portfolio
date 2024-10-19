// src/appInsights.ts

import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING,
    samplingPercentage: 100,
  },
});

appInsights.loadAppInsights();
console.log("Application Insights initialized");

export default appInsights;
