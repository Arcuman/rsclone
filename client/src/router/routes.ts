import { renderMain } from '@/components/Main/Main.render';
import { ResolveContext, RouteContext } from 'universal-router';
import { AUTH_URL, MENU_URL, ROOT_URL, GAME_URL, MY_CARDS_URL } from '@/router/constants';
import { getGame } from '@/components/Game/Game.services';
import { SCENES } from '@/components/Game/constant';
import { RouteResultResponse, Route } from './types';

export const routes: Route[] = [
  {
    path: AUTH_URL,
    action: (context: RouteContext): RouteResultResponse => {
      if (context.isUserAuthenticate)
        return {
          redirect: MENU_URL,
          page: null,
          scene: null,
        };
      return {
        redirect: null,
        page: renderMain(AUTH_URL),
        scene: null,
      };
    },
    children: null,
  },
  {
    path: '/',
    action: (context: ResolveContext): RouteResultResponse => {
      if (!context.isUserAuthenticate)
        return {
          redirect: AUTH_URL,
          page: null,
          scene: null,
        };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return <RouteResultResponse>context.next();
    },
    children: [
      {
        path: GAME_URL,
        action: (context: RouteContext): RouteResultResponse => ({
          redirect: null,
          page: null,
          scene: SCENES.GAME,
        }),
        children: null,
      },
      {
        path: MENU_URL,
        action: (context: RouteContext): RouteResultResponse => ({
          redirect: null,
          page: null,
          scene: SCENES.MENU,
        }),
        children: null,
      },
      {
        path: MY_CARDS_URL,
        action: (context: RouteContext): RouteResultResponse => ({
          redirect: null,
          page: null,
          scene: SCENES.MY_CARDS,
        }),
        children: null,
      },
      {
        path: ROOT_URL,
        action: (context: RouteContext): RouteResultResponse => ({
          redirect: MENU_URL,
          page: null,
          scene: null,
        }),
        children: null,
      },
    ],
  },
];
