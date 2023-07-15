const Route = {
  ROOT: '/',
  SIGNUP: `/signup`,
  NOT_FOUND: '/not_found',
  DASHBOARD: '/dashboard',
  EVOLUTION: '/evolution',
  PACIENTMENU: '/pacient_menu',
  UNKNOWN_ROUTE: '*',
};

export type RoutesType = typeof Route;
export type RouteNames = keyof RoutesType;
export type RoutePaths = RoutesType[RouteNames];

export default Route;

export const routesInfo = [
  { path: Route.ROOT, isPrivate: false },
  { path: Route.SIGNUP, isPrivate: false },
  { path: Route.NOT_FOUND, isPrivate: false },
  { path: Route.DASHBOARD, isPrivate: true },
  { path: Route.EVOLUTION, isPrivate: true },
  { path: Route.PACIENTMENU, isPrivate: true },
];
