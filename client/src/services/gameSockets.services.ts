import * as io from 'socket.io-client';

export interface Card {
  id: number;
  name: string;
  isActive: boolean;
  health: number;
  attack: number;
  manaCost: number;
}

export interface GameState {
  health: number;
  maxMana: number;
  currentMana: number;
  handCards: Array<Card>;
  deckCountCards: number;
  isPlayerOneTurn: boolean;
  enemy: {
    health: number;
    maxMana: number;
    currentMana: number;
    countCards: number;
    deckCountCards: number;
  };
}
export default function test(): void {
  const socket = io.connect('ws://localhost:3000', {
    path: '/websocket',
  });
  let isPlayerOne = false;
  let isPlayerOneTurn = false;
  socket.on('waitSecondPlayer', (): void => {
    isPlayerOne = true;
  });
  socket.on('opponentFound', (): void => {});
  socket.on('opponentDisconnected', () => {});
  socket.on('disconnect', (reason: string) => {});
  socket.on('initState', (initState: GameState) => {
    isPlayerOneTurn = initState.isPlayerOneTurn;
  });
  socket.on('timer', (countDown: number) => {});
  socket.on('nextTurn', (curPlayerOneTurn: boolean) => {
    isPlayerOneTurn = curPlayerOneTurn;
  });
  setTimeout(() => {
    if (isPlayerOne === isPlayerOneTurn) socket.emit('nextTurn');
  }, 5000);
}
