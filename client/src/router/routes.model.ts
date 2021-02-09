import { ResolveContext } from 'universal-router';

export interface RouteResultResponse {
  redirect: string | null;
  page: HTMLElement | null;
  scene: string | null;
}
export interface ResolveContextWithNext extends ResolveContext {
  next: () => RouteResultResponse;
}
export interface Route {
  path: string;
  action: (context?: ResolveContext) => RouteResultResponse;
  children: Array<Route> | null | undefined;
}
