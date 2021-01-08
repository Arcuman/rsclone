import {GameState} from '@/resources/Game/game.models';
import {Player} from '@/resources/Game/Player/player.model';
import {Room} from '@/resources/Game/Room/room.model';
import {getEnemyPlayer} from '@/resources/Game/Room/room.servicies';

export function generateInitialGameState(room:Room, curPlayer : Player) : GameState{
  const enemyPlayer = getEnemyPlayer(room, curPlayer);
  return {
    health: curPlayer.health,
    maxMana: curPlayer.maxMana,
    currentMana: curPlayer.currentMana,
    deckCountCards: curPlayer.deckCards.length,
    handCards: curPlayer.handCards,
    enemy: {
      health: enemyPlayer.health,
      maxMana: enemyPlayer.maxMana,
      currentMana:  enemyPlayer.currentMana,
      countCards: enemyPlayer.handCards.length,
      deckCountCards: enemyPlayer.deckCards.length,
    },
    isPlayerOneTurn: room.isPlayerOneTurn,
  };
}
