// components/OtelInitializer.tsx
'use client';

import { useEffect } from 'react';
import { initOtelClient } from '../../lib/otelClient';

/**
 * A client component that initializes OpenTelemetry when mounted.
 */
const OtelInitializer: React.FC = () => {
  useEffect(() => {
    initOtelClient();
  }, []);

  return null; // This component doesn't render anything
};

export default OtelInitializer;
