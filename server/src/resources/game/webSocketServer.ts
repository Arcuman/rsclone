import * as http from 'http';
import { Server, Socket } from 'socket.io';
import gameLogic from '@/resources/game/game.controller';
import {Room} from '@/resources/game/room/room.model';

export default (server : http.Server ) : void => {
  /* const rooms : Array<Room> = [];
  const io = new Server(server,
    {
      path: '/websocket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      }});
  let id = 0;
  io.on('connection', (socket : Socket) : void =>{
    id = id === 2 ? 1 : id += 1 ;
    gameLogic(io, socket, rooms, id);
  }); */
};
