import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';

let appInsights: ApplicationInsights;

if (typeof window !== 'undefined') {
  const browserHistory = createBrowserHistory();
  const reactPlugin = new ReactPlugin();

  const clickPluginInstance = new ClickAnalyticsPlugin();
  const clickPluginConfig = {
    autoCapture: true,
    dataTags: {
      useDefaultContentNameOrId: true
    }
  };

  appInsights = new ApplicationInsights({
    config: {
      connectionString: process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING,
      enableAutoRouteTracking: true,
      extensions: [reactPlugin, clickPluginInstance],
      extensionConfig: {
        [reactPlugin.identifier]: { history: browserHistory },
        [clickPluginInstance.identifier]: clickPluginConfig
      }
    },
  });

  appInsights.loadAppInsights();
} else {
  appInsights = {
    trackPageView: () => {},
    trackEvent: () => {},
  } as unknown as ApplicationInsights;
}

export default appInsights;
