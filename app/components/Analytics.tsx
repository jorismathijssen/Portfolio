// app/components/Analytics.tsx

"use client"; // Designate as a Client Component

import { useEffect } from 'react';
import appInsights from '../../lib/AppInsights'; // Adjust the path based on your project structure

const Analytics = () => {
  useEffect(() => {
    if (appInsights) {
      // Track the initial page view
      appInsights.trackPageView({ name: window.location.pathname });

      // Function to handle route changes
      const handleRouteChange = () => {
        appInsights.trackPageView({ name: window.location.pathname });
      };

      // Listen to 'popstate' event for back/forward navigation
      window.addEventListener('popstate', handleRouteChange);

      // Monkey-patch pushState and replaceState to detect client-side navigations
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        handleRouteChange();
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        handleRouteChange();
      };

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;