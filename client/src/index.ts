import test from '@/services/gameSockets.services';
import { renderMain } from '@/components/Main/Main.render';
import './styles/styles.scss';
import { store } from './redux/store/rootStore';

renderMain();
test();

store.subscribe(() => {
  const state = store.getState();
});
