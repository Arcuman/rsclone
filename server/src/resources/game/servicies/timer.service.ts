import {Room} from '@/resources/game/room/room.model';
import {Server} from 'socket.io';
import {COUNTDOWN_SEC, NEXT_TURN, TIMER} from '@/resources/game/constants';

export function countDownTimer(openRoom:Room, io:Server):void{
  if (openRoom.countDown>0){
    openRoom.setCountDown(openRoom.countDown-1);
  } else {
    openRoom.setCountDown(COUNTDOWN_SEC);
    openRoom.setIsPlayerOneTurn(!openRoom.isPlayerOneTurn);
    io.to(openRoom.id).emit(NEXT_TURN, openRoom.isPlayerOneTurn);
  }
  io.to(openRoom.id).emit(TIMER, openRoom.countDown);
}
