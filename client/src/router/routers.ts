import UniversalRouter, { RouteResult } from 'universal-router';
import generateUrls from 'universal-router/src/generateUrls';
import { routes } from './routes';

const router = new UniversalRouter(routes);

const url = generateUrls(router);

export const homePage: Promise<HTMLElement | null | undefined> = router
  .resolve({ pathname: url('home') })
  .then((response: RouteResult<HTMLElement>) => response);
/*
export const testPage: Promise<HTMLElement | null | undefined> = router
  .resolve({ pathname: url('test') })
  .then((response: RouteResult<HTMLElement>) => response);

export const hobaPage: Promise<HTMLElement | null | undefined> = router
  .resolve({ pathname: url('hoba') })
  .then((response: RouteResult<HTMLElement>) => response); */
