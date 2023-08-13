import { useEffect } from 'react';

import * as Sentry from '@sentry/react';

import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';

export interface Extras {
  [name: string]: string;
}

const setUp = (): void => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    profilesSampleRate: 1.0,

    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
      new Sentry.BrowserProfilingIntegration(),
      new Sentry.Replay({
        // Additional SDK configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    release: 'tcc@0.5',
  });
};

const logEvent = (message: string, extras?: Extras): void => {
  Sentry.withScope((scope): void => {
    scope.setLevel('info');
    if (extras) {
      scope.setExtras(extras);
    }
    Sentry.captureMessage(message);
  });
};

const logError = (error: Error, extras?: Extras): void => {
  Sentry.withScope((scope): void => {
    scope.setLevel('error');
    if (extras) {
      scope.setExtras(extras);
    }
    Sentry.captureException(error);
  });
};

const logNavigation = (
  routeName: string,
  params?: { [name: string]: string } | undefined,
  extras?: Extras,
): void => {
  Sentry.withScope((scope): void => {
    if (extras) {
      scope.setExtras(extras);
    }
    Sentry.addBreadcrumb({
      category: 'navigation',
      data: { params, routeName },
      level: 'info',
      message: `navigated to ${routeName}`,
    });
    Sentry.captureMessage(`navigated to ${routeName}`);
  });
};

const logServerError = (error: string | Error, extras?: Extras): void => {
  Sentry.withScope((scope): void => {
    if (extras) {
      scope.setExtras(extras);
    }
    Sentry.addBreadcrumb({
      category: 'Server error',
      data: { error, extras },
      level: 'error',
      message: `Server error`,
    });
    Sentry.captureMessage(`Server error`);
  });
};

const logNetworkError = (error: string, extras?: Extras): void => {
  Sentry.withScope((scope): void => {
    if (extras) {
      scope.setExtras(extras);
    }
    Sentry.addBreadcrumb({
      category: 'network error',
      data: { error, extras },
      level: 'error',
      message: `Network error`,
    });
    Sentry.captureMessage(`Network error`);
  });
};

export default {
  logError,
  logEvent,
  logServerError,
  logNavigation,
  logNetworkError,
  setUp,
};
