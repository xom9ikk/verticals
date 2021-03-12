import React, { FC } from 'react';
import * as SentryReact from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import SentryRRWeb from '@sentry/rrweb';
import { ErrorFallback } from '@comp/ErrorFallback';

SentryReact.init({
  dsn: process.env.SENTRY_URL,
  integrations: [new Integrations.BrowserTracing(), new SentryRRWeb()],
  tracesSampleRate: 1.0,
  normalizeDepth: 10,
  environment: process.env.SENTRY_ENVIRONMENT,
});

export const Sentry: FC = ({
  children,
}) => (
  <SentryReact.ErrorBoundary fallback={ErrorFallback}>
    {children}
  </SentryReact.ErrorBoundary>
);
