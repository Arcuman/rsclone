/* eslint-disable @typescript-eslint/no-unsafe-return */
import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/src/generateUrls';
import { routes } from './routes';

const router = new UniversalRouter(routes);

const url = generateUrls(router);

export const homePage = router.resolve({ pathname: url('home') }).then(res => res);
export const testPage = router.resolve({ pathname: url('test-page') }).then(res => res);
export const hoba = router.resolve({ pathname: url('hoba') }).then(res => res);
