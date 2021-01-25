import { Player } from '@/resources/game/player/player.model';
import { Room } from '@/resources/game/room/room.model';
import { Server } from 'socket.io';
import { getEnemyPlayer } from '@/resources/game/room/room.service';
import { COUNTDOWN_SEC, NEXT_ROUND, NEXT_TURN } from '@/resources/game/constants';

function addAndResetManaToPlayer(player: Player): void {
  player.setMaxMana(player.maxMana + 1);
  player.setCurrentMana(player.maxMana);
}

export function nextTurn(openRoom: Room, player: Player, io: Server): void {
  if (openRoom.newRound) {
    const enemy = getEnemyPlayer(openRoom, player);
    addAndResetManaToPlayer(player);
    addAndResetManaToPlayer(enemy);
    io.to(openRoom.id).emit(NEXT_ROUND, player.maxMana, player.currentMana);
  }
  openRoom.setNewRound(!openRoom.newRound);
  openRoom.setIsPlayerOneTurn(!openRoom.isPlayerOneTurn);
  openRoom.setCountDown(COUNTDOWN_SEC);
  io.to(openRoom.id).emit(NEXT_TURN, openRoom.isPlayerOneTurn);
}
