import { RouteContext } from 'universal-router';

export interface RouteResultResponse {
  redirect: string | null;
  page: HTMLElement | null;
  scene: string | null;
}

export interface Route {
  path: string;
  action: (context: RouteContext) => RouteResultResponse;
  children: Array<Route> | null | undefined;
}
