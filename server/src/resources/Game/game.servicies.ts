import {v4 as uuidv4} from 'uuid';
import {GameState, Room} from '@/resources/Game/game.models';
import {Player} from '@/resources/Game/Player/player.model';

function getEnemyPlayer(room: Room, curPlayer: Player) : Player{
  const enemyPlayer = room.players.find((player:Player) => player.userId !== curPlayer.userId);
  if (enemyPlayer === undefined || enemyPlayer === null) {
    throw new TypeError('No second player here');
  }
  return enemyPlayer;
}

export function isOpenedRoomExist(rooms : Array<Room>): boolean{
  const openRoom = rooms.find((room ) => room.players.length < 2);
  return !!openRoom;
}
export function getOpenedRoom(rooms : Array<Room>): Room {
  return <Room>rooms.find((room) => room.players.length < 2);
}
export function createRoom(): Room{
  return {
    id: uuidv4(),
    isPlayerOneTurn: true,
    players: [],
  };
}

export function deleteRoom(rooms : Array<Room>, openRoom : Room) : void{
  const openRoomIndex = rooms.findIndex((room)=>
    room.id === openRoom.id,
  );
  rooms.splice(openRoomIndex, 1);
}
export function deletePlayerFromRoom(players : Array<Player>, player : Player) : void{
  const indexOfPlayer = players.findIndex(
    (roomPlayer) =>
      roomPlayer.socket.id === player.socket.id,
  );
  players.splice(indexOfPlayer, 1);
}

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
