import type { ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import * as Sentry from '@sentry/react';

import { setupAxios } from 'services';
import Logging from 'services/logging';

import Theme from './theme';

import Routes from './routes';

import './styles.css';

Logging.setUp();
setupAxios();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

const AppContainer = (): ReactElement => (
  <Theme>
    <SnackbarProvider maxSnack={1} autoHideDuration={5000}>
      <Routes />
    </SnackbarProvider>
  </Theme>
);

const App = Sentry.withProfiler(AppContainer);

root.render(<App />);
