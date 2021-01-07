import { Socket } from 'socket.io';

export interface Player{
  socket: Socket;
}

export interface Room {
  id: string;
  players: Array<Player>;
}
