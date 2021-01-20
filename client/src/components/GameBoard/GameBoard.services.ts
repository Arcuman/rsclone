import Phaser from 'phaser';
import { setBackground } from '@/utils/utils';
import { cardBase } from '@/components/Card/Card.render';
import { 
  endTurnButton, 
  enemyAvatar, 
  enemyCardsConfig, 
  enemyDeck, 
  enemyMana, 
  playerAvatar, 
  playerCardsConfig, 
  playerDeck, 
  playerMana, 
  table, 
  timer 
} from './constants';
import { IMAGES } from '../Game/constant';
import { createAvatar } from './UserAvatar/Avatar.render';
import { avatarPosition } from './UserAvatar/constants';
import { createTable } from './Table/Table.render';

export function preload(this: Phaser.Scene): void {}

export function create(game: Phaser.Scene): void {
  setBackground(game, IMAGES.LOAD_BACKGROUND.NAME);

  game.add.rectangle(
    enemyCardsConfig.POSITION_X,
    enemyCardsConfig.POSITION_Y,
    enemyCardsConfig.WIDTH,
    enemyCardsConfig.HEIGHT,
    enemyCardsConfig.COLOR,
  );

  game.add.rectangle(
    playerCardsConfig.POSITION_X,
    playerCardsConfig.POSITION_Y,
    playerCardsConfig.WIDTH,
    playerCardsConfig.HEIGHT,
    playerCardsConfig.COLOR,
  );

  game.add.rectangle(
    table.POSITION_X,
    table.POSITION_Y,
    table.WIDTH,
    table.HEIGHT,
    table.COLOR,
  );

  game.add.rectangle(
    playerAvatar.POSITION_X,
    playerAvatar.POSITION_Y,
    playerAvatar.WIDTH,
    playerAvatar.HEIGHT,
    playerAvatar.COLOR,
  );

  game.add.rectangle(
    enemyAvatar.POSITION_X,
    enemyAvatar.POSITION_Y,
    enemyAvatar.WIDTH,
    enemyAvatar.HEIGHT,
    enemyAvatar.COLOR,
  );

  game.add.rectangle(
    timer.POSITION_X,
    timer.POSITION_Y,
    timer.WIDTH,
    timer.HEIGHT,
    timer.COLOR,
  );

  game.add.rectangle(
    endTurnButton.POSITION_X,
    endTurnButton.POSITION_Y,
    endTurnButton.WIDTH,
    endTurnButton.HEIGHT,
    endTurnButton.COLOR,
  );

  game.add.rectangle(
    playerMana.POSITION_X,
    playerMana.POSITION_Y,
    playerMana.WIDTH,
    playerMana.HEIGHT,
    playerMana.COLOR,
  );

  game.add.rectangle(
    enemyMana.POSITION_X,
    enemyMana.POSITION_Y,
    enemyMana.WIDTH,
    enemyMana.HEIGHT,
    enemyMana.COLOR,
  );

  game.add.rectangle(
    playerDeck.POSITION_X,
    playerDeck.POSITION_Y,
    playerDeck.WIDTH,
    playerDeck.HEIGHT,
    playerDeck.COLOR,
  );

  game.add.rectangle(
    enemyDeck.POSITION_X,
    enemyDeck.POSITION_Y,
    enemyDeck.WIDTH,
    enemyDeck.HEIGHT,
    enemyDeck.COLOR,
  );

  const gameWidth = game.game.config.width;
  const gameHeight = game.game.config.height;

  const containerX: number = <number>gameWidth / 2;
  const containerY: number = <number>gameHeight - 80;

  let cardImg: string = IMAGES.AGENT.NAME;
  cardBase({
    scene: game,
    posX: containerX,
    posY: containerY,
    card: cardImg,
    mana: '6',
    attack: '2',
    health: '2',
  });

  cardImg = IMAGES.SHIV.NAME;
  cardBase({
    scene: game,
    posX: containerX + 50,
    posY: containerY,
    card: cardImg,
    mana: '1',
  });

  cardImg = IMAGES.GAME_BOARD.NAME;
  const createGameTable = createTable({
    scene: game,
    posX: <number>gameWidth / 2,
    posY: <number>gameHeight / 2,
    img: cardImg,
  });

  const { USER_X, USER_Y, ENEMY_X, ENEMY_Y } = avatarPosition;
  cardImg = IMAGES.AVATAR.NAME;
  const userAvatarExample = createAvatar({
    scene: game,
    posX: USER_X,
    posY: USER_Y,
    card: cardImg,
    userName: 'Korolevishna',
    health: '30',
  });

  const enemyAvatarExample = createAvatar({
    scene: game,
    posX: ENEMY_X,
    posY: ENEMY_Y,
    card: cardImg,
    userName: 'Spider',
    health: '30',
  });
}
