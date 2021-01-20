import {GameState} from '@/resources/game/game.models';
import {Player} from '@/resources/game/player/player.model';
import {Room} from '@/resources/game/room/room.model';
import {deletePlayerFromRoom, deleteRoom, getEnemyPlayer} from '@/resources/game/room/room.service';
import {INIT_STATE} from '@/resources/game/constants';

export function generateInitialGameState(room:Room, curPlayer : Player) : GameState{
  const enemyPlayer = getEnemyPlayer(room, curPlayer);
  return {
    health: curPlayer.health,
    maxMana: curPlayer.maxMana,
    currentMana: curPlayer.currentMana,
    deckCountCards: curPlayer.deckCards.length,
    handCards: curPlayer.handCards,
    tableCards: curPlayer.tableCards,
    enemy: {
      health: enemyPlayer.health,
      maxMana: enemyPlayer.maxMana,
      currentMana:  enemyPlayer.currentMana,
      countCards: enemyPlayer.handCards.length,
      deckCountCards: enemyPlayer.deckCards.length,
      tableCards: enemyPlayer.tableCards,
    },
    isPlayerOneTurn: room.isPlayerOneTurn,
  };
}

export function closeSocket(openRoom: Room, rooms: Array<Room>, player: Player) :void{
  deletePlayerFromRoom(openRoom.players, player);
  if (openRoom.players.length === 0) {
    deleteRoom(rooms, openRoom);
  } else {
    openRoom.players[0].socket.emit('opponentDisconnected');
  }
  player.socket.disconnect();
}
export function sendInitState(room: Room): void{
  room.players.forEach(player => {
    const initialState = generateInitialGameState(room, player);
    player.socket.emit(INIT_STATE, initialState);
  });
}
