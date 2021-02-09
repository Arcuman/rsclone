import { renderMain } from '@/components/Main/Main.render';
import {
  AUTH_URL,
  MENU_URL,
  ROOT_URL,
  GAME_URL,
  MY_CARDS_URL,
  PROFILE_URL,
  CURR_DECK_CHOOSE_URL,
} from '@/router/constants';
import { SCENES } from '@/components/Game/constant';
import { ResolveContext } from 'universal-router';
import { RouteResultResponse, Route, ResolveContextWithNext } from './routes.model';

function createRouteResult(
  redirect: string | null,
  page: HTMLElement | null,
  scene: string | null,
): RouteResultResponse {
  return {
    redirect,
    page,
    scene,
  };
}

export const routes: Route[] = [
  {
    path: AUTH_URL,
    action: (context: ResolveContext): RouteResultResponse => {
      if (context.isUserAuthenticate) return createRouteResult(MENU_URL, null, null);
      return createRouteResult(null, renderMain(AUTH_URL), null);
    },
    children: null,
  },
  {
    path: '/',
    action: (context: ResolveContext): RouteResultResponse => {
      if (!context.isUserAuthenticate) return createRouteResult(AUTH_URL, null, null);
      return (<ResolveContextWithNext>context).next();
    },
    children: [
      {
        path: GAME_URL,
        action: (): RouteResultResponse =>
          createRouteResult(null, null, SCENES.FIND_ENEMY),
        children: null,
      },
      {
        path: MENU_URL,
        action: (): RouteResultResponse =>
          createRouteResult(null, null, SCENES.MENU),
        children: null,
      },
      {
        path: MY_CARDS_URL,
        action: (): RouteResultResponse =>
          createRouteResult(null, null, SCENES.MY_CARDS),
        children: null,
      },
      {
        path: ROOT_URL,
        action: (): RouteResultResponse =>
          createRouteResult(MENU_URL, null, null),
        children: null,
      },
      {
        path: PROFILE_URL,
        action: (): RouteResultResponse =>
          createRouteResult(null, null, SCENES.PROFILE),
        children: null,
      },
      {
        path:CURR_DECK_CHOOSE_URL,
        action: (): RouteResultResponse =>
          createRouteResult(null, null, SCENES.CHOOSE_DECK),
        children: null,
      },
    ],
  },
];
