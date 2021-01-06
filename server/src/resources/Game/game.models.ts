import { Socket } from 'socket.io';

export interface IPlayer{
  socket: Socket;
}

export interface IRoom {
  id: string;
  players: Array<IPlayer>;
}
