import Phaser from 'phaser';
import { IMAGES, SCENES } from '@/components/Game/constant';
import {
  ALREADY_PLAY,
  BACK_TO_MENU_TIME,
  END_YOYR_MATCH,
  ENEMY_FOUND,
  FIND_ENEMY_PLAYER,
  OPPONENT_FOUND,
  INIT_STATE,
  TEXT_POSITION_Y,
  WAIT_SECOND_PLAYER,
} from '@/components/FindEnemyScene/constants';
import { textDecoration } from '@/components/Card/constants';
import { browserHistory } from '@/router/history';
import { MENU_URL } from '@/router/constants';
import { connectToServer } from '@/components/FindEnemyScene/FindEnemyScene.service';
import { setBackground } from '@/utils/utils';
import { GameState } from '@/components/GameBoard/GameBoard.model';

export class FindEnemyScene extends Phaser.Scene {
  private socket: SocketIOClient.Socket;

  private text: Phaser.GameObjects.Text;

  private isPlayerOne = false;

  constructor() {
    super({
      key: SCENES.FIND_ENEMY,
      active: false,
      visible: false,
    });
  }

  create(): void {
    setBackground(this, IMAGES.LOAD_BACKGROUND.NAME);
    this.socket = connectToServer();

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
      this.text.setText(ENEMY_FOUND);
    });

    this.socket.on(WAIT_SECOND_PLAYER, (): void => {
      this.isPlayerOne = true;
    });

    this.socket.on(INIT_STATE, (gameState: GameState): void => {
      this.scene.start(SCENES.GAME_BOARD, {
        initState: gameState,
        socket: this.socket,
        isPlayerOne: this.isPlayerOne,
      });
    });

    this.socket.on(ALREADY_PLAY, (): void => {
      this.text.setText(END_YOYR_MATCH);
      setTimeout(() => {
        browserHistory.push(MENU_URL);
      }, BACK_TO_MENU_TIME);
    });
  }
}
