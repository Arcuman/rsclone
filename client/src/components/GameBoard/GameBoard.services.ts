import Phaser from 'phaser';
import { IMAGES } from '@/components/Game/constant';
import { setBackground } from '@/utils/utils';
import { CardCreateInfo } from '@/components/Card/Card.model';
import { cardBase } from '@/components/Card/Card.render';
import { endTurnButton, enemyAvatar, enemyCardsConfig, enemyDeck, enemyMana, playerAvatar, playerCardsConfig, playerDeck, playerMana, table, timer } from './constants';

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

  const cardInfo: CardCreateInfo = {
    scene: game,
    posX: containerX,
    posY: containerY,
    card: 'agent',
    mana: '6',
    attack: '2',
    health: '3',
  };
  cardBase(cardInfo);
}
