/* eslint-disable no-console */
import { io } from 'socket.io-client';

export default function test(): void {
  const socket = io('ws://localhost:3000', {
    path: '/websocket',
  });
  socket.on('waitSecondPlayer', (): void => {});
  socket.on('opponentFound', (): void => {});
  socket.on('opponentDisconnected', () => {});
  socket.on('disconnect', (reason: string) => {});
}
