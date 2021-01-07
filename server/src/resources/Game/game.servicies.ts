import {v4 as uuidv4} from 'uuid';
import {Player, Room} from '@/resources/Game/game.models';
import {Socket} from 'socket.io';

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
    players: [],
  };
}

export function createPlayer(socket: Socket) : Player{
  return {
    socket,
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
