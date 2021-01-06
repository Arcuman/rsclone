import * as http from 'http';
import { Server, Socket } from 'socket.io';
import gameLogic from '@/resources/Game/game.controller';
import {IRoom} from '@/resources/Game/game.models';

export default (server : http.Server ) : void => {
  const rooms : Array<IRoom> = [];
  const io = new Server(server,
    {
      path: '/websocket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      }});

  io.on('connection', (socket : Socket) : void =>{
    gameLogic(io, socket, rooms);
  });
};
