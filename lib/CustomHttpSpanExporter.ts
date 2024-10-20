import { SpanExporter, ReadableSpan } from '@opentelemetry/sdk-trace-base';
import { ExportResult } from '@opentelemetry/core';

/**
 * A custom SpanExporter that sends spans to a specified HTTP endpoint.
 */
export class CustomHttpSpanExporter implements SpanExporter {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    const payload = spans.map(span => ({
      name: span.name,
      traceId: span.spanContext().traceId,
      parentId: span.parentSpanId,
      id: span.spanContext().spanId,
      kind: span.kind,
      timestamp: span.startTime,
      duration: span.duration,
      attributes: span.attributes,
      status: span.status,
      events: span.events,
    }));

    fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          console.debug(`Successfully exported ${spans.length} span(s) to ${this.endpoint}`);
          resultCallback({ code: 0 }); // SUCCESS
        } else {
          console.warn(`Failed to export spans to ${this.endpoint}: ${response.statusText}`);
          resultCallback({ code: 1, error: new Error(response.statusText) }); // FAILED
        }
      })
      .catch(error => {
        console.error(`Error exporting spans to ${this.endpoint}:`, error);
        resultCallback({ code: 1, error }); // FAILED
      });
  }

  shutdown(): Promise<void> {
    // Implement shutdown logic if necessary
    return Promise.resolve();
  }

  forceFlush(): Promise<void> {
    // Implement flush logic if necessary
    return Promise.resolve();
  }
}