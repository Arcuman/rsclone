import { Room } from '@/resources/game/room/room.model';
import { v4 as uuidv4 } from 'uuid';
import { Player } from '@/resources/game/player/player.model';
import { COUNTDOWN_SEC, PLAYER_READY } from '@/resources/game/constants';
import { MAX_ROOM_PLAYERS_COUNT, NO_SECOND_PLAYER } from '@/resources/game/room/constants';
import { clearTimeout } from 'timers';

export function getEnemyPlayer(room: Room, curPlayer: Player): Player {
  const enemyPlayer = room.players.find((player: Player) => player.userId !== curPlayer.userId);
  if (enemyPlayer === undefined || enemyPlayer === null) {
    throw new TypeError(NO_SECOND_PLAYER);
  }
  return enemyPlayer;
}

export function closeRoom(openRoom: Room, rooms: Array<Room>): void {
  clearTimeout(openRoom.timer!);
  const roomId = rooms.findIndex((room: Room) => room.id === openRoom.id);
  if (roomId > -1) {
    rooms.splice(roomId, 1);
  }
}

export function isOpenedRoomExist(rooms: Array<Room>): boolean {
  const openRoom = rooms.find(room => room.players.length < MAX_ROOM_PLAYERS_COUNT);
  return !!openRoom;
}
export function getOpenedRoom(rooms: Array<Room>): Room {
  return <Room>rooms.find(room => room.players.length < MAX_ROOM_PLAYERS_COUNT);
}
export function createRoom(): Room {
  return {
    id: uuidv4(),
    isPlayerOneTurn: Math.random() < 0.5,
    playerOne: null,
    players: [],
    timer: null,
    newRound: false,
    countDown: COUNTDOWN_SEC,
    playersReady: PLAYER_READY,
    setCountDown(value: number) {
      this.countDown = value;
    },
    setIsPlayerOneTurn(value: boolean) {
      this.isPlayerOneTurn = value;
    },
    setNewRound(value: boolean) {
      this.newRound = value;
    },
  };
}

export function getOrCreateOpenRoom(rooms: Array<Room>): Room {
  let openRoom: Room;
  if (isOpenedRoomExist(rooms)) {
    openRoom = getOpenedRoom(rooms);
  } else {
    openRoom = createRoom();
    rooms.push(openRoom);
  }
  return openRoom;
}

export function deleteRoom(rooms: Array<Room>, openRoom: Room): void {
  const openRoomIndex = rooms.findIndex(room => room.id === openRoom.id);
  rooms.splice(openRoomIndex, 1);
}

export function deletePlayerFromRoom(players: Array<Player>, player: Player): void {
  const indexOfPlayer = players.findIndex(roomPlayer => roomPlayer.socket.id === player.socket.id);
  players.splice(indexOfPlayer, 1);
}
