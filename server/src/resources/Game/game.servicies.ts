import {v4 as uuidv4} from 'uuid';
import {IPlayer, IRoom} from '@/resources/Game/game.models';
import {Socket} from 'socket.io';

export function isOpenedRoomExist(rooms : Array<IRoom>): boolean{
  const openRoom = rooms.find((room ) => room.players.length < 2);
  return !!openRoom;
}
export function getOpenedRoom(rooms : Array<IRoom>): IRoom {
  return <IRoom>rooms.find((room) => room.players.length < 2);
}
export function createRoom(): IRoom{
  return {
    id: uuidv4(),
    players: [],
  };
}

export function createPlayer(socket: Socket) : IPlayer{
  return {
    socket,
  };
}

export function deleteRoom(rooms : Array<IRoom>, openRoom : IRoom) : void{
  const openRoomIndex = rooms.findIndex((room)=>
    room.id === openRoom.id,
  );
  rooms.splice(openRoomIndex, 1);
}
export function deletePlayerFromRoom(players : Array<IPlayer>, player : IPlayer) : void{
  const indexOfPlayer = players.findIndex(
    (roomPlayer) =>
      roomPlayer.socket.id === player.socket.id,
  );
  players.splice(indexOfPlayer, 1);
}
