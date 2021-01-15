import { renderMain } from '@/components/Main/Main.render';
import { Routes } from './types';

export const routes: Routes = [
  { name: 'home', path: '/home', action: (): HTMLElement => renderMain('default') },
  { name: 'test', path: '/home/test', action: (): HTMLElement => renderMain('/test-page') },
  { name: 'hoba', path: '/home/hoba', action: (): HTMLElement => renderMain('/hoba-page') },
  { name: 'auth', path: '/home/auth', action: (): HTMLElement => renderMain('/auth') },
];
