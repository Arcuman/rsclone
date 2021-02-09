import { store } from '@/redux/store/rootStore';
import { createGame } from '@/redux/actions/actions';
import { createHtmlElement, deleteOldMain } from '@/utils/utils';
import Phaser from 'phaser';
import { createConfig, SCENES } from '@/components/Game/constant';
import { LoadScene } from '@/components/LoadScene/LoadScene';
import { CURSOR_DEFAULT } from '@/constants/constants';

export function getGame(): Phaser.Game | null | undefined {
  const state = store.getState();
  return state.game.game;
}

export function createGameObj(nextScene: string): Phaser.Game {
  deleteOldMain();

  const main = createHtmlElement('main', 'main');
  document.body.appendChild(main);

  const game = new Phaser.Game(createConfig(main));
  game.scene.add(SCENES.LOAD, LoadScene);
  game.scene.start(SCENES.LOAD, { nextScene });
  store.dispatch(createGame(game));
  game.input.setDefaultCursor(CURSOR_DEFAULT);
  return game;
}
