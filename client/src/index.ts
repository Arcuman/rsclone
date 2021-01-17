import 'normalize.css';
import './styles/styles.scss';
import { browserHistory } from '@/router/history';
import { Action, Update } from 'history';
import { router } from '@/router/routers';
import { isUserAuthenticate } from '@/components/Auth/Auth.services';
import { RouteResultResponse } from '@/router/routes.model';
import { createGameObj, getGame } from '@/components/Game/Game.services';
import { SCENES } from '@/components/Game/constant';
import { deleteOldMain } from '@/utils/utils';
import { store } from './redux/store/rootStore';

async function onLocationChange(changes: Update): Promise<void> {
  router
    .resolve({
      pathname: changes.location.pathname,
      isUserAuthenticate: await isUserAuthenticate(),
    })
    .then(({ page, redirect, scene }: RouteResultResponse) => {
      if (redirect) {
        browserHistory.replace(redirect);
      } else if (page) {
        deleteOldMain();
        document.body.appendChild(page);
      } else if (scene) {
        const game = getGame();
        if (game) {
          game.scene.start(scene);
        } else {
          createGameObj(scene);
        }
      }
    });
}
browserHistory.listen((obj: Update) => {
  onLocationChange(obj);
});
onLocationChange({ action: Action.Push, location: browserHistory.location });

store.subscribe(() => {
  const state = store.getState();
});
