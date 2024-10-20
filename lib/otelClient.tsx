// lib/otelClient.ts
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ConsoleSpanExporter, SimpleSpanProcessor, SpanExporter, ReadableSpan, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { ExportResult } from '@opentelemetry/core';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { CustomHttpSpanExporter } from '../lib/CustomHttpSpanExporter'; // Import the custom exporter

/**
 * A custom SpanExporter that wraps another SpanExporter and adds logging.
 */
class LoggingSpanExporter implements SpanExporter {
  private exporter: SpanExporter;

  constructor(exporter: SpanExporter) {
    this.exporter = exporter;
  }

  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    console.debug(`Exporting ${spans.length} span(s)`);
    spans.forEach((span, index) => {
      console.debug(`Span ${index + 1}: ${span.name}, TraceId: ${span.spanContext().traceId}`);
    });

    this.exporter.export(spans, (result) => {
      if (result.code === 0) { // SUCCESS
        console.debug(`Successfully exported ${spans.length} span(s)`);
      } else {
        console.warn(`Failed to export spans:`, result);
      }
      resultCallback(result);
    });
  }

  shutdown(): Promise<void> {
    return this.exporter.shutdown(); // Corrected method call
  }
}

let otelInitialized = false;

/**
 * Initializes OpenTelemetry on the client-side.
 */
export function initOtelClient() {
  if (typeof window === 'undefined' || otelInitialized) {
    // Ensure this runs only in the browser and only once
    return;
  }

  otelInitialized = true;
  console.debug('Initializing OpenTelemetry on the client-side...');

  // Initialize the tracer provider
  const provider = new WebTracerProvider({
    // Optional: Configure resource attributes here
  });

  // Choose the exporter
  const isProduction = process.env.NODE_ENV === 'production';
  let exporter: SpanExporter;

  if (isProduction) {
    const backendEndpoint = process.env.NEXT_PUBLIC_OTEL_BACKEND_ENDPOINT;
    if (backendEndpoint) {
      exporter = new CustomHttpSpanExporter(backendEndpoint);
      console.debug(`Using CustomHttpSpanExporter to send spans to ${backendEndpoint}.`);
    } else {
      console.warn('Backend endpoint for OpenTelemetry is not set. Falling back to ConsoleSpanExporter.');
      exporter = new ConsoleSpanExporter();
    }
  } else {
    exporter = new ConsoleSpanExporter();
    console.debug('Using ConsoleSpanExporter for OpenTelemetry.');
  }

  // Wrap the exporter with LoggingSpanExporter
  const loggingExporter = new LoggingSpanExporter(exporter);

  // Add a Span Processor
  if (isProduction) {
    provider.addSpanProcessor(new BatchSpanProcessor(loggingExporter));
  } else {
    provider.addSpanProcessor(new SimpleSpanProcessor(loggingExporter));
  }

  // Register the tracer provider with a context manager
  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // Register instrumentations
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        // Optional: Configure fetch instrumentation options
      }),
      new XMLHttpRequestInstrumentation({
        // Optional: Configure XHR instrumentation options
      }),
      // Add other instrumentations as needed
    ],
  });

  console.debug('OpenTelemetry client-side initialization complete.');

  // (Optional) Create a manual span for testing
  console.debug('Creating a manual span for testing.');

  const tracer = provider.getTracer('default');
  const span = tracer.startSpan('manual-span');

  // Simulate some operation
  setTimeout(() => {
    span.end();
  }, 1000);
}
