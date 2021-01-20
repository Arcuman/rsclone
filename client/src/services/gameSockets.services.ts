import { WEBSOCKET_PATH, WEBSOCKET_HOST_PORT } from '@/constants/constants';
import * as io from 'socket.io-client';
import { GameState } from '@/components/GameBoard/GameBoard.model';

interface Card {
  id: number;
  name: string;
  isActive: boolean;
  health: number;
  attack: number;
  manaCost: number;
}

export default function test(): void {
  const socket = io.connect(WEBSOCKET_HOST_PORT, {
    path: WEBSOCKET_PATH,
  });
  let initialState: GameState;
  let isPlayerOne = false;
  let isPlayerOneTurn = false;
  socket.on('waitSecondPlayer', (): void => {
    isPlayerOne = true;
  });
  socket.on('opponentFound', (): void => {});
  socket.on('opponentDisconnected', () => {});
  socket.on('disconnect', (reason: string) => {});
  socket.on('initState', (initState: GameState) => {
    initialState = initState;
    isPlayerOneTurn = initState.isPlayerOneTurn;
    // eslint-disable-next-line no-console
    console.log(`PlayerOne: ${isPlayerOne.toString()} \n
    PlayerOneTurn: ${isPlayerOneTurn.toString()}
    currentState:
    `);
    // eslint-disable-next-line no-console
    console.log(initialState);
    setTimeout(() => {
      if (isPlayerOne === isPlayerOneTurn) {
        socket.emit('handCardPlay', initialState.handCards[0]);
        // eslint-disable-next-line no-console
        console.log(initialState.handCards[0]);
        socket.emit('nextTurn');
      }
    }, 5000);
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log(
        `isPlayerOne- ${isPlayerOne.toString()} isPlayerOneTurn- ${isPlayerOneTurn.toString()} tableCards ${
          initialState.tableCards.length
        } `,
      );
      if (
        isPlayerOne === isPlayerOneTurn &&
        initialState.enemy.tableCards.length > 0 &&
        initialState.tableCards.length > 0
      ) {
        socket.emit(
          'tableCardPlayCardTarget',
          initialState.tableCards[0].id,
          initialState.enemy.tableCards[0].id,
        );
        // eslint-disable-next-line no-console
        console.log(initialState.tableCards[0]);
        socket.emit('nextTurn');
      } else {
        socket.emit('handCardPlay', initialState.handCards[0]);
        // eslint-disable-next-line no-console
        console.log(initialState.handCards[0]);
        socket.emit('nextTurn');
      }
    }, 10000);
  });
  socket.on('timer', (countDown: number) => {});
  socket.on('notEnoughMana', () => {
    // eslint-disable-next-line no-console
    console.log('NotEnoughMana');
  });
  socket.on('nextTurn', (curPlayerOneTurn: boolean) => {
    isPlayerOneTurn = curPlayerOneTurn;
  });
  socket.on('nextRound', (maxMana: number) => {
    initialState.currentMana = maxMana;
    initialState.maxMana = maxMana;
    initialState.enemy.maxMana = maxMana;
    initialState.enemy.maxMana = maxMana;
  });
  socket.on('handCardPlay', (card: Card, isPlayerOnePlay: boolean) => {
    if (isPlayerOne === isPlayerOnePlay) {
      initialState.currentMana = card.manaCost;
      initialState.handCards.splice(
        initialState.handCards.findIndex((handCard: Card) => handCard.id === card.id),
        1,
      );
      initialState.tableCards.push(card);
    } else {
      initialState.enemy.countCards -= 1;
      initialState.enemy.currentMana -= card.manaCost;
      initialState.enemy.tableCards.push(card);
    }
  });
  socket.on('playerDamage', (health: number, isPlayerOnePlay: boolean) => {
    if (isPlayerOnePlay === isPlayerOne) {
      initialState.enemy.health = health;
    } else {
      initialState.health = health;
    }
    // eslint-disable-next-line no-console
    console.log(`PlayerOne: ${isPlayerOne.toString()} \n
    PlayerOneTurn: ${isPlayerOneTurn.toString()}
    currentState:
    `);
    // eslint-disable-next-line no-console
    console.log(initialState);
  });
  socket.on('tableCardDamage', (damagedCard: Card, isPlayerOnePlay: boolean) => {
    // eslint-disable-next-line no-console
    console.log('tableCardDamage');
    if (isPlayerOnePlay === isPlayerOne) {
      initialState.tableCards.find(card => card.id === damagedCard.id)!.health = damagedCard.health;
    } else {
      initialState.enemy.tableCards.find(card => card.id === damagedCard.id)!.health =
        damagedCard.health;
    }
    // eslint-disable-next-line no-console
    console.log(`PlayerOne: ${isPlayerOne.toString()} \n
    PlayerOneTurn: ${isPlayerOneTurn.toString()}
    currentState:
    `);
    // eslint-disable-next-line no-console
    console.log(initialState);
  });
  socket.on('tableCardDestroy', (destroyedCard: Card, isPlayerOnePlay: boolean) => {
    // eslint-disable-next-line no-console
    console.log('tableCardDestroy');
    if (isPlayerOnePlay === isPlayerOne) {
      initialState.tableCards.splice(
        initialState.tableCards.findIndex((tableCard: Card) => tableCard.id === destroyedCard.id),
        1,
      );
    } else {
      initialState.enemy.tableCards.splice(
        initialState.tableCards.findIndex((tableCard: Card) => tableCard.id === destroyedCard.id),
        1,
      );
    }
    // eslint-disable-next-line no-console
    console.log(`PlayerOne: ${isPlayerOne.toString()} \n
    PlayerOneTurn: ${isPlayerOneTurn.toString()}
    currentState:
    `);
    // eslint-disable-next-line no-console
    console.log(initialState);
  });
}
