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

export const routesNames = [
  { path: Route.ROOT, name: '' },
  { path: Route.SIGNUP, name: 'Cadastrar' },
  { path: Route.NOT_FOUND, name: 'Pagina Desconhecida' },
  { path: Route.DASHBOARD, name: 'Menu Inicial' },
  { path: Route.EVOLUTION, name: 'Evolucao' },
  { path: Route.PACIENTMENU, name: 'Pacientes' },
];
