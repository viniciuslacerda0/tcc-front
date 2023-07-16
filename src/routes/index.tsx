import { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes as RoutesContainer,
  Route as RouterRoute,
  Navigate,
} from 'react-router-dom';

import { withSentryReactRouterV6Routing, withProfiler } from '@sentry/react';

import BaseStructure from 'components/BaseStructure';

import Route, { routesInfo } from './Route';
import PrivateRoute from './PrivateRoute';
import SignUp from './SignUp';
import Home from './Home';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Evolution from './Evolution';
import PacientMenu from './PacientMenu';

const SentryRoutes = withSentryReactRouterV6Routing(RoutesContainer);

const routesMap = {
  [Route.SIGNUP]: SignUp,
  [Route.ROOT]: Home,
  [Route.NOT_FOUND]: NotFound,
  [Route.DASHBOARD]: Dashboard,
  [Route.EVOLUTION]: Evolution,
  [Route.PACIENTMENU]: PacientMenu,
};

const redirectToNotFound = (): JSX.Element => <Navigate to={Route.NOT_FOUND} />;

const Routes = (): JSX.Element => {
  const routes = useMemo(
    () =>
      Object.entries(routesMap).map(([name, Component]) => {
        const currentRoute = routesInfo.find(({ path }) => path === name);
        return !currentRoute?.isPrivate ? (
          <RouterRoute path={name} element={<Component />} key={name} />
        ) : (
          <RouterRoute
            path={name}
            element={
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            }
            key={name}
          />
        );
      }),
    [],
  );

  return (
    <Router>
      <BaseStructure>
        <SentryRoutes>
          {routes}
          <RouterRoute
            path={Route.UNKNOWN_ROUTE}
            element={redirectToNotFound()}
          />
        </SentryRoutes>
      </BaseStructure>
    </Router>
  );
};

export default withProfiler(Routes);
