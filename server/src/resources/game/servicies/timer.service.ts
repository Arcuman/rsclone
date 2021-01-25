import { Room } from '@/resources/game/room/room.model';
import { Server } from 'socket.io';
import { TIMER } from '@/resources/game/constants';
import {Player} from '@/resources/game/player/player.model';
import {nextTurn} from '@/resources/game/servicies/nextTurn.service';

export function countDownTimer(openRoom: Room, player: Player, io: Server): void {
  if (openRoom.countDown > 0) {
    openRoom.setCountDown(openRoom.countDown - 1);
  } else {
    nextTurn(openRoom, player, io);
  }
  io.to(openRoom.id).emit(TIMER, openRoom.countDown);
}
