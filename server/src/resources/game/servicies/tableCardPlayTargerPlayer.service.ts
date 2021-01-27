import { Room } from '@/resources/game/room/room.model';
import { Player } from '@/resources/game/player/player.model';
import { Server } from 'socket.io';
import { getEnemyPlayer } from '@/resources/game/room/room.service';
import { getCardById } from '@/resources/game/player/player.service';
import { PLAYER_DAMAGE, PLAYER_WIN } from '@/resources/game/constants';

export function tableCardPlayTargetPlayer(
  cardId: number,
  openRoom: Room,
  player: Player,
  io: Server
): void {
  const enemy = getEnemyPlayer(openRoom, player);
  const playerCard = getCardById(player, cardId);
  const attack = playerCard.attack || 0;
  enemy.health -= attack;
  io.to(openRoom.id).emit(PLAYER_DAMAGE, enemy.health, openRoom.isPlayerOneTurn);
  if (enemy.health <= 0) {
    io.to(openRoom.id).emit(PLAYER_WIN, openRoom.isPlayerOneTurn);
  }
}
