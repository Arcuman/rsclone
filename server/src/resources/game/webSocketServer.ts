import * as http from 'http';
import { Server, Socket } from 'socket.io';
import gameLogic from '@/resources/game/game.controller';
import { Room } from '@/resources/game/room/room.model';

export default (htppServer: http.Server): void => {
  const rooms: Array<Room> = [];
  const io = new Server(htppServer, {
    path: '/websocket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', (socket: Socket): void => {
    gameLogic(io, socket, rooms);
  });
};
