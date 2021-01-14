import { renderMain } from '@/components/Main/Main.render';

export const routes = [
  { name: 'home', path: '/home', action: (): HTMLElement => renderMain('default') },
  { name: 'test-page', path: '/home/test-page', action: (): HTMLElement => renderMain('/test-1') },
  { name: 'hoba', path: '/home/hoba', action: (): HTMLElement => renderMain('/test-2') },
];
