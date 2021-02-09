import UniversalRouter, {
  RouteContext,
  RouteResult,
  RouteParams,
} from 'universal-router';
import { renderMain } from '@/components/Main/Main.render';
import { RouteResultResponse } from '@/router/routes.model';
import { ERROR_404_URL } from '@/router/constants';
import { routes } from './routes';

const options = {
  context: { user: null },
  resolveRoute(context: RouteContext, params: RouteParams): RouteResult<HTMLElement> {
    if (typeof context.route.action === 'function') {
      return <RouteResult<HTMLElement>>context.route.action(context, params);
    }
    return undefined;
  },
  errorHandler(): RouteResult<RouteResultResponse> {
    return {
      page: renderMain(ERROR_404_URL),
      redirect: null,
      scene: null,
    };
  },
};
export const router = new UniversalRouter(routes, options);
