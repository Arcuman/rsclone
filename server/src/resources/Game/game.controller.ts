import { Server, Socket } from 'socket.io';
import {
  createPlayer,
  createRoom,
  deletePlayerFromRoom,
  deleteRoom,
  getOpenedRoom,
  isOpenedRoomExist,
} from '@/resources/Game/game.servicies';
import {Room} from '@/resources/Game/game.models';

export default function gameLogic(io: Server, socket : Socket, rooms: Array<Room>) : void {
  const player = createPlayer(socket);
  let openRoom : Room;

  if (isOpenedRoomExist(rooms)) {
    openRoom = getOpenedRoom(rooms);
  } else {
    openRoom = createRoom();
    rooms.push(openRoom);
  }

  openRoom.players.push(player);
  player.socket.join(openRoom.id);

  if (openRoom.players.length === 2){
    io.to(openRoom.id).emit('opponentFound');
  } else {
    io.to(openRoom.id).emit('waitSecondPlayer');
  }

  player.socket.on('closeSocket', () => {
    deletePlayerFromRoom(openRoom.players, player);
    if (openRoom.players.length === 0){
      deleteRoom(rooms, openRoom);
    } else {
      openRoom.players[0].socket.emit('opponentDisconnected');
    }
    player.socket.disconnect();
  });
}
