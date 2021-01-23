import { setBackground, createTextData} from '@/utils/utils';
import { ATLASES, IMAGES,  SCENES } from '@/components/Game/constant';
import { browserHistory } from '@/router/history';
import {createButton} from '@/components/Button/Button.services';
import {textDecoration, positionInfo} from './constants';

const user={
  nickName:'Halina2',
  level:2,
  exp: 3,
  currDeck:'',
};

export function create(scene: Phaser.Scene): void {
  setBackground(scene, IMAGES.PROFILE_BACKGROUND.NAME);
  
  const userInfoBlock = scene.add.image(
    270,
    scene.cameras.main.height / 2,
    IMAGES.SETTINGS_BLOCK_IMAGE.NAME,
  );
  
  userInfoBlock.setScale(0.8).setScrollFactor(0); 

  const textUserName: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y,
    `Ник: ${user.nickName}`,
    textDecoration,
  );

  const textUserLevel: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y+50,
    `Уровень: ${user.level.toString()}`,
    textDecoration,
  );

  const textUserExp: Phaser.GameObjects.Text = createTextData(
    scene,
    positionInfo.TEXT_X,
    positionInfo.TEXT_Y+100,
    `Опыт: ${user.exp.toString()}`,
    textDecoration,
  );
  // const avatarLayers = [shadow, spriteCard, textHealth, textUserName];
  /*  
    startButton.on('pointerup', () => {
      browserHistory.push(GAME_URL);
    });
     */
}