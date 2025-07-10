// lib/appInsights.ts
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';

let appInsights: ApplicationInsights | null = null;

const initializeAppInsights = () => {
    if (appInsights) {
        // AI has already been initialized
        return appInsights;
    }

    const reactPlugin = new ReactPlugin();
    const clickPluginInstance = new ClickAnalyticsPlugin();

    appInsights = new ApplicationInsights({
        config: {
            connectionString: process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING || '',
            enableAutoRouteTracking: true,
            extensions: [reactPlugin, clickPluginInstance],
            extensionConfig: {
                [reactPlugin.identifier]: {},
                [clickPluginInstance.identifier]: {
                    autoCapture: true,
                    dataTags: {
                        useDefaultContentNameOrId: true,
                    },
                },
            },
            disableTelemetry: false, // Change this to false
        },
    });

    appInsights.loadAppInsights();
    appInsights.trackPageView();

    return appInsights;
};

export { initializeAppInsights };
export default appInsights;
