import { Server, Socket } from 'socket.io';
import {
  createRoom,
  deletePlayerFromRoom,
  deleteRoom, generateInitialGameState,
  getOpenedRoom,
  isOpenedRoomExist,
} from '@/resources/Game/game.servicies';
import {Room} from '@/resources/Game/game.models';
import {createPlayer} from '@/resources/Game/Player/player.servicies';

function sendInitState(room: Room): void{
  room.players.forEach(player => {
    const initialState = generateInitialGameState(room, player);
    player.socket.emit('initState', initialState);
  });
}

export default async function gameLogic(io: Server, socket: Socket, rooms: Array<Room>, id:number): Promise<void> {
  const player = await createPlayer(id, socket);
  let openRoom: Room;

  if (isOpenedRoomExist(rooms)) {
    openRoom = getOpenedRoom(rooms);
  } else {
    openRoom = createRoom();
    rooms.push(openRoom);
  }

  openRoom.players.push(player);
  player.socket.join(openRoom.id);

  if (openRoom.players.length === 2) {
    io.to(openRoom.id).emit('opponentFound');
    sendInitState(openRoom);
    io.to(openRoom.id).emit('startGame');
  } else {
    io.to(openRoom.id).emit('waitSecondPlayer');
  }

  player.socket.on('closeSocket', () => {
    deletePlayerFromRoom(openRoom.players, player);
    if (openRoom.players.length === 0) {
      deleteRoom(rooms, openRoom);
    } else {
      openRoom.players[0].socket.emit('opponentDisconnected');
    }
    player.socket.disconnect();
  });
}
