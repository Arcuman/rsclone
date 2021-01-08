import { Server, Socket } from 'socket.io';
import {
  generateInitialGameState,
} from '@/resources/Game/game.servicies';
import {createPlayer} from '@/resources/Game/Player/player.servicies';
import {Room} from '@/resources/Game/Room/room.model';
import {
  createRoom,
  deletePlayerFromRoom,
  deleteRoom,
  getOpenedRoom,
  isOpenedRoomExist,
} from '@/resources/Game/Room/room.servicies';
import {COUNTDOWN_SEC} from '@/resources/Game/constants';

function sendInitState(room: Room): void{
  room.players.forEach(player => {
    const initialState = generateInitialGameState(room, player);
    player.socket.emit('initState', initialState);
  });
}

function getOrCreateOpenRoom(rooms: Array<Room>) : Room {
  let openRoom : Room;
  if (isOpenedRoomExist(rooms)) {
    openRoom = getOpenedRoom(rooms);
  } else {
    openRoom = createRoom();
    rooms.push(openRoom);
  }
  return openRoom;
}

export default async function gameLogic(io: Server, socket: Socket, rooms: Array<Room>, id:number): Promise<void> {
  const player = await createPlayer(id, socket);
  const openRoom: Room = getOrCreateOpenRoom(rooms);

  openRoom.players.push(player);
  player.socket.join(openRoom.id);

  if (openRoom.players.length === 2) {
    io.to(openRoom.id).emit('opponentFound');
    sendInitState(openRoom);
    io.to(openRoom.id).emit('startGame');
    openRoom.timer = setInterval(() => {
      if (openRoom.countDown>0){
        openRoom.countDown -= 1;
      } else {
        openRoom.countDown = COUNTDOWN_SEC;
        openRoom.isPlayerOneTurn = !openRoom.isPlayerOneTurn;
        io.to(openRoom.id).emit('nextTurn', openRoom.isPlayerOneTurn);
      }
      io.to(openRoom.id).emit('timer', openRoom.countDown);
    }, 1000);
  } else {
    io.to(openRoom.id).emit('waitSecondPlayer');
  }

  player.socket.on('nextTurn', ()=>{
    openRoom.isPlayerOneTurn = !openRoom.isPlayerOneTurn;
    openRoom.countDown = COUNTDOWN_SEC + 1;
  });

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
