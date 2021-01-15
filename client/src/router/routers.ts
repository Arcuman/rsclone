import UniversalRouter, {
  RouteContext,
  RouteResult,
  ResolveContext,
  RouteError,
  RouteParams,
} from 'universal-router';
import generateUrls from 'universal-router/src/generateUrls';

import { routes } from './routes';

const options = {
  context: { user: null },
  resolveRoute(context: RouteContext, params: RouteParams): RouteResult<HTMLElement> {
    // eslint-disable-next-line no-console
    console.log('resolveRoute');
    if (typeof context.route.action === 'function') {
      return <RouteResult<HTMLElement>>context.route.action(context, params);
    }
    return undefined;
  },
  errorHandler(error: RouteError, context: ResolveContext): RouteResult<string> {
    // eslint-disable-next-line no-console
    console.log('eresolveRoute');
    return error.status === 404 ? '<h1>Page Not Found</h1>' : '<h1>Oops! Something went wrong</h1>';
  },
};

const router = new UniversalRouter(routes, options);

const url = generateUrls(router);

export const setHomePage: () => Promise<HTMLElement | null | undefined> = () =>
  router.resolve({ pathname: url('home') }).then((response: RouteResult<HTMLElement>) => response);

export const setTestPage: () => Promise<HTMLElement | null | undefined> = () =>
  router.resolve({ pathname: url('test') }).then((response: RouteResult<HTMLElement>) => response);

export const setHobaPage: () => Promise<HTMLElement | null | undefined> = () =>
  router.resolve({ pathname: url('hoba') }).then((response: RouteResult<HTMLElement>) => response);
