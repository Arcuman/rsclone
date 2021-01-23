import { Room } from '@/resources/game/room/room.model';
import { Player } from '@/resources/game/player/player.model';
import { Server } from 'socket.io';
import { getEnemyPlayer } from '@/resources/game/room/room.service';
import { getCardById } from '@/resources/game/player/player.service';
import { TABLE_CARD_DAMAGE, TABLE_CARD_DESTROY } from '@/resources/game/constants';

export function tableCardPlayTargetCard(
  cardId: number,
  targetId: number,
  openRoom: Room,
  player: Player,
  io: Server
): void {
  const enemy = getEnemyPlayer(openRoom, player);
  const playerCard = getCardById(player, cardId);
  const enemyCard = getCardById(enemy, targetId);
  enemyCard.health -= playerCard.attack;
  io.to(openRoom.id).emit(TABLE_CARD_DAMAGE, enemyCard, !openRoom.isPlayerOneTurn);
  playerCard.health -= enemyCard.attack;
  io.to(openRoom.id).emit(TABLE_CARD_DAMAGE, playerCard, openRoom.isPlayerOneTurn);
  if (enemyCard.health < 0) {
    enemy.tableCards.splice(
      enemy.tableCards.findIndex(tableCard => enemyCard.id === tableCard.id),
      1
    );
    io.to(openRoom.id).emit(TABLE_CARD_DESTROY, enemyCard, !openRoom.isPlayerOneTurn);
  }
  if (playerCard.health < 0) {
    player.tableCards.splice(
      enemy.tableCards.findIndex(tableCard => playerCard.id === tableCard.id),
      1
    );
    io.to(openRoom.id).emit(TABLE_CARD_DESTROY, enemyCard, openRoom.isPlayerOneTurn);
  }
}
