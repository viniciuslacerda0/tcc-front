const Route = {
  ROOT: '/',
  SIGNUP: `/signup`,
  NOT_FOUND: '/not_found',
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
];
