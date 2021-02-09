import { Room } from '@/resources/game/room/room.model';
import { Player } from '@/resources/game/player/player.model';
import { Server } from 'socket.io';
import { closeRoom, getEnemyPlayer } from '@/resources/game/room/room.service';
import { getCardById } from '@/resources/game/player/player.service';
import {
  EXP_LOSE,
  EXP_WIN,
  PLAYER_DAMAGE,
  PLAYER_LOSE,
  PLAYER_WIN,
} from '@/resources/game/constants';
import { usersService } from '@/resources/users/user.controller';
import { UpdatedUserLevelInfo } from '@/resources/users/user.model';

export async function tableCardPlayTargetPlayer(
  cardId: number,
  openRoom: Room,
  player: Player,
  io: Server,
  rooms: Room[],
): Promise<void> {
  const enemy = getEnemyPlayer(openRoom, player);
  const playerCard = getCardById(player, cardId);
  const attack = playerCard.attack || 0;
  enemy.health -= attack;
  io.to(openRoom.id).emit(PLAYER_DAMAGE, enemy.health, openRoom.isPlayerOneTurn);

  if (enemy.health <= 0) {
    const playerInfo: UpdatedUserLevelInfo = await usersService.updateUserExp(
      player.userId,
      EXP_WIN,
    );

    const enemyInfo: UpdatedUserLevelInfo = await usersService.updateUserExp(
      enemy.userId,
      EXP_LOSE,
    );

    player.socket.emit(PLAYER_WIN, playerInfo);
    enemy.socket.emit(PLAYER_LOSE, enemyInfo);
    closeRoom(openRoom, rooms);
    clearInterval(openRoom.timer!);
    enemy.socket.disconnect();
    player.socket.disconnect();
  }
}
