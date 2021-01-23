import { Server, Socket } from 'socket.io';
import { closeSocket, sendInitState } from '@/resources/game/game.service';
import { createPlayer } from '@/resources/game/player/player.service';
import { Room } from '@/resources/game/room/room.model';
import { closeRoom, getOrCreateOpenRoom } from '@/resources/game/room/room.service';
import {
  ALREADY_PLAY,
  CLOSE_SOCKET,
  DISCONNECT,
  HAND_CARD_PLAY,
  NEXT_TURN,
  OPPONENT_FOUND,
  START_GAME,
  TABLE_CARD_PLAY_CARD_TARGET,
  TABLE_CARD_PLAY_PLAYER_TARGET,
  WAIT_SECOND_PLAYER,
} from '@/resources/game/constants';

import { nextTurn } from '@/resources/game/servicies/nextTurn.service';
import { countDownTimer } from '@/resources/game/servicies/timer.service';
import { handCardPlay } from '@/resources/game/servicies/handCardPlay.service';
import { tableCardPlayTargetPlayer } from '@/resources/game/servicies/tableCardPlayTargerPlayer.service';
import { tableCardPlayTargetCard } from '@/resources/game/servicies/tableCardPlayTargerCard.service';
import { webToken } from '@/helpers/webToken';
import { Card } from '@/resources/card/card.model';

function isPlayerPlayed(rooms: Array<Room>, userId: number): boolean {
  return rooms.some(room => room.players.some(player => player.userId === userId));
}

export default async function gameLogic(
  io: Server,
  socket: Socket,
  rooms: Array<Room>,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore.
  const userId = webToken.getDataFromToken(socket.handshake.query.token);
  if (isPlayerPlayed(rooms, userId)) {
    socket.emit(ALREADY_PLAY);
    socket.disconnect();
    return;
  }
  const player = await createPlayer(userId, socket);
  const openRoom: Room = getOrCreateOpenRoom(rooms);

  openRoom.players.push(player);
  player.socket.join(openRoom.id);

  if (openRoom.players.length === 2) {
    io.to(openRoom.id).emit(OPPONENT_FOUND);
    sendInitState(openRoom);
    io.to(openRoom.id).emit(START_GAME);
    openRoom.timer = setInterval(() => countDownTimer(openRoom, io), 1000);
  } else {
    io.to(openRoom.id).emit(WAIT_SECOND_PLAYER);
  }

  player.socket.on(NEXT_TURN, () => nextTurn(openRoom, player, io));

  player.socket.on(HAND_CARD_PLAY, (card: Card) => {
    handCardPlay(card, player, openRoom, io);
  });

  player.socket.on(TABLE_CARD_PLAY_PLAYER_TARGET, (cardId: number) => {
    tableCardPlayTargetPlayer(cardId, openRoom, player, io);
  });
  player.socket.on(TABLE_CARD_PLAY_CARD_TARGET, (cardId: number, targetId: number) => {
    tableCardPlayTargetCard(cardId, targetId, openRoom, player, io);
  });

  player.socket.on(CLOSE_SOCKET, () => closeSocket(openRoom, rooms, player));
  player.socket.on(DISCONNECT, () => {
    closeRoom(openRoom, rooms);
  });
}
