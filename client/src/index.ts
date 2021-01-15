import test from '@/services/gameSockets.services';
import { renderMain } from '@/components/Main/Main.render';
import './styles/styles.scss';
import { store } from './redux/store/rootStore';

renderMain();

// перед каждым запросом делать провекрку - если истек и есть рефрештокен, то сделать рефреш сессию
// если не истек и есть то отправлять токен добавить в request
// если есть в куках взять данные и положить в стейт

store.subscribe(() => {
  renderMain();
});
