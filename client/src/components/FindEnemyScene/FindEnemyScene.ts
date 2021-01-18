import Phaser from 'phaser';
import { SCENES } from '@/components/Game/constant';
import io from 'socket.io-client';
import { WEBSOCKET_HOST_PORT, WEBSOCKET_PATH } from '@/constants/constants';
import {
  ALREADY_PLAY,
  FIND_ENEMY_PLAYER,
  OPPONENT_FOUND,
  TEXT_POSITION_Y,
  WAIT_SECOND_PLAYER,
} from '@/components/FindEnemyScene/constants';
import { textDecoration } from '@/components/Card/constants';
import { store } from '@/redux/store/rootStore';
import { browserHistory } from '@/router/history';
import { MENU_URL } from '@/router/constants';

export class FindEnemyScene extends Phaser.Scene {
  private socket: SocketIOClient.Socket;

  private text: Phaser.GameObjects.Text;

  private isPlayerOne: boolean;

  constructor() {
    super({
      key: SCENES.FIND_ENEMY,
      active: false,
      visible: false,
    });
  }

  create(): void {
    const state = store.getState();
    const token = state.authUser.accessToken;
    this.socket = io.connect(WEBSOCKET_HOST_PORT, {
      path: WEBSOCKET_PATH,
      query: { token },
    });
    this.text = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - TEXT_POSITION_Y,
        FIND_ENEMY_PLAYER,
        {
          fontFamily: textDecoration.FONT_FAMILY,
          fontSize: textDecoration.FONT_SIZE,
          color: textDecoration.FONT_COLOR,
        },
      )
      .setOrigin(0.5, 0.5);
    this.text.setStroke(textDecoration.TEXT_OUTLINE_COLOR, textDecoration.TEXT_OUTLINE_SIZE);
    this.socket.on(OPPONENT_FOUND, (): void => {
      this.text.setText('OpponentFound');
    });
    this.socket.on(WAIT_SECOND_PLAYER, (): void => {
      this.isPlayerOne = true;
    });
    this.socket.on(ALREADY_PLAY, (): void => {
      this.text.setText('End your match');
      setTimeout(() => {
        browserHistory.push(MENU_URL);
      }, 3000);
    });
  }
}
