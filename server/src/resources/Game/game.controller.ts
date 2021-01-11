import {Server, Socket} from 'socket.io';
import {generateInitialGameState} from '@/resources/Game/game.servicies';
import {createPlayer, getCardById} from '@/resources/Game/Player/player.servicies';
import {Room} from '@/resources/Game/Room/room.model';
import {
  createRoom,
  deletePlayerFromRoom,
  deleteRoom,
  getEnemyPlayer,
  getOpenedRoom,
  isOpenedRoomExist,
} from '@/resources/Game/Room/room.servicies';
import {
  CLOSE_SOCKET,
  COUNTDOWN_SEC, HAND_CARD_PLAY, NEXT_ROUND,
  NEXT_TURN, NOT_ENOUGH_MANA,
  OPPONENT_FOUND, PLAYER_DAMAGE,
  START_GAME, TABLE_CARD_DAMAGE, TABLE_CARD_DESTROY, TABLE_CARD_PLAY,
  TIMER,
  WAIT_SECOND_PLAYER,
} from '@/resources/Game/constants';
import {Card} from '@/resources/Card/card.models';
import {TargetType} from '@/resources/Game/game.models';

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
    io.to(openRoom.id).emit(OPPONENT_FOUND);
    sendInitState(openRoom);
    io.to(openRoom.id).emit(START_GAME);
    openRoom.timer = setInterval(() => {
      if (openRoom.countDown>0){
        openRoom.countDown -= 1;
      } else {
        openRoom.countDown = COUNTDOWN_SEC;
        openRoom.isPlayerOneTurn = !openRoom.isPlayerOneTurn;
        io.to(openRoom.id).emit(NEXT_TURN, openRoom.isPlayerOneTurn);
      }
      io.to(openRoom.id).emit(TIMER, openRoom.countDown);
    }, 1000);
  } else {
    io.to(openRoom.id).emit(WAIT_SECOND_PLAYER);
  }

  player.socket.on(NEXT_TURN, ()=>{
    if (openRoom.newRound) {
      const enemy = getEnemyPlayer(openRoom, player);
      player.maxMana += 1;
      enemy.maxMana += 1;
      player.currentMana = player.maxMana;
      enemy.currentMana =  enemy.maxMana;
      io.to(openRoom.id).emit(NEXT_ROUND, player.maxMana, player.currentMana);
    }
    openRoom.newRound = !openRoom.newRound;
    openRoom.isPlayerOneTurn = !openRoom.isPlayerOneTurn;
    openRoom.countDown = COUNTDOWN_SEC + 1;
    io.to(openRoom.id).emit(NEXT_TURN, openRoom.isPlayerOneTurn);
  });

  player.socket.on(HAND_CARD_PLAY, (card: Card)=>{
    if (player.currentMana >= card.manaCost) {
      player.currentMana -= card.manaCost;
      player.handCards
        .splice(player.handCards.findIndex((handCard: Card) => handCard.id === card.id), 1);
      player.tableCards.push(card);
      io.to(openRoom.id).emit(HAND_CARD_PLAY, card, openRoom.isPlayerOneTurn);
    } else {
      player.socket.emit(NOT_ENOUGH_MANA);
    }
  });

  player.socket.on(TABLE_CARD_PLAY, (cardId:number, targetType: TargetType, targetId:number)=>{
    const enemy = getEnemyPlayer(openRoom, player);
    const playerCard =  getCardById(player, cardId);
    let enemyCard : Card;
    switch (targetType) {
      case TargetType.enemyPlayer:
        // eslint-disable-next-line no-console
        console.log('here');
        enemy.health -= playerCard.attack;
        io.to(openRoom.id).emit(PLAYER_DAMAGE, enemy.health, openRoom.isPlayerOneTurn);
        break;
      case TargetType.enemyCard:
        enemyCard = getCardById(enemy, targetId);
        enemyCard.health -= playerCard.attack;
        io.to(openRoom.id).emit(TABLE_CARD_DAMAGE, enemyCard, !openRoom.isPlayerOneTurn);
        playerCard.health -= enemyCard.attack;
        io.to(openRoom.id).emit(TABLE_CARD_DAMAGE, playerCard, openRoom.isPlayerOneTurn);
        if (enemyCard.health < 0){
          enemy.tableCards
            .splice(enemy.tableCards.findIndex((tableCard) => enemyCard.id === tableCard.id), 1);
          io.to(openRoom.id).emit(TABLE_CARD_DESTROY, enemyCard, !openRoom.isPlayerOneTurn);
        }
        if (playerCard.health < 0){
          player.tableCards
            .splice(enemy.tableCards.findIndex((tableCard) => playerCard.id === tableCard.id), 1);
          io.to(openRoom.id).emit(TABLE_CARD_DESTROY, enemyCard, openRoom.isPlayerOneTurn);
        }
        break;
      default:
        break;
    }
  });

  player.socket.on(CLOSE_SOCKET
    , () => {
      deletePlayerFromRoom(openRoom.players, player);
      if (openRoom.players.length === 0) {
        deleteRoom(rooms, openRoom);
      } else {
        openRoom.players[0].socket.emit('opponentDisconnected');
      }
      player.socket.disconnect();
    });
}
