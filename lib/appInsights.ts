import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING,
  },
});

appInsights.loadAppInsights();

export default appInsights;