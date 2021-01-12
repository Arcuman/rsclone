import test from '@/services/gameSockets.services';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createTable } from './components/GameBoard/Table/Table.render';
import { testAction } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import { renderMain } from '@/components/Main/Main.render';
import './styles/styles.scss';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

renderMain();
test();
createTable();

const testButton = document.createElement('button');
testButton.innerText = 'Test Button';
testButton.addEventListener('click', () => {
  store.dispatch(testAction());
});
document.body.appendChild(testButton);

store.subscribe(() => {
  const state = store.getState();

  const testDiv = document.createElement('div');
  testDiv.innerText = `${state.testVar.testState.toString()}`;
  document.body.appendChild(testDiv);
});
