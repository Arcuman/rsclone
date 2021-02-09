import { Player } from '@/resources/game/player/player.model';
import { Room } from '@/resources/game/room/room.model';
import { Server } from 'socket.io';
import { getEnemyPlayer } from '@/resources/game/room/room.service';
import {
  COUNTDOWN_SEC,
  DESTROY_DECK_CARD,
  ENEMY_GET_DECK_CARD,
  GET_DECK_CARD,
  MAX_HAND_CARDS,
  NEXT_ROUND,
  NEXT_TURN,
} from '@/resources/game/constants';

function addAndResetManaToPlayer(player: Player): void {
  player.setMaxMana(player.maxMana + 1);
  player.setCurrentMana(player.maxMana);
}

export function nextTurn(openRoom: Room, player: Player, io: Server): void {
  const enemy = getEnemyPlayer(openRoom, player);
  if (openRoom.newRound) {
    addAndResetManaToPlayer(player);
    addAndResetManaToPlayer(enemy);
    io.to(openRoom.id).emit(NEXT_ROUND, player.maxMana, player.currentMana);
  }
  openRoom.setNewRound(!openRoom.newRound);
  openRoom.setIsPlayerOneTurn(!openRoom.isPlayerOneTurn);
  openRoom.setCountDown(COUNTDOWN_SEC);
  io.to(openRoom.id).emit(NEXT_TURN, openRoom.isPlayerOneTurn);
  if (enemy.deckCards.length) {
    const deckCard = enemy.deckCards.pop();
    if (enemy.handCards.length < MAX_HAND_CARDS) {
      enemy.handCards.push(deckCard!);
      enemy.socket.emit(GET_DECK_CARD, deckCard);
      player.socket.emit(ENEMY_GET_DECK_CARD);
    } else {
      io.to(openRoom.id).emit(DESTROY_DECK_CARD, deckCard, openRoom.isPlayerOneTurn);
    }
  }
}
