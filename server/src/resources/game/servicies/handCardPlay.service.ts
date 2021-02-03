import { Card } from '@/resources/card/card.model';
import { Player } from '@/resources/game/player/player.model';
import { Room } from '@/resources/game/room/room.model';
import { Server } from 'socket.io';
import { HAND_CARD_PLAY, NO_SUCH_CARD_ERROR, NOT_ENOUGH_MANA } from '@/resources/game/constants';

export function handCardPlay(cardId: number, player: Player, openRoom: Room, io: Server): void {
  const card = player.handCards.find(handCard => handCard.id === cardId);
  if (!card) {
    throw new TypeError(NO_SUCH_CARD_ERROR);
  }
  if (player.currentMana >= card.manaCost) {
    player.setCurrentMana(player.currentMana - card.manaCost);
    player.handCards.splice(
      player.handCards.findIndex((handCard: Card) => handCard.id === card.id),
      1,
    );
    player.tableCards.push(card);
    io.to(openRoom.id).emit(HAND_CARD_PLAY, card, openRoom.isPlayerOneTurn);
  } else {
    player.socket.emit(NOT_ENOUGH_MANA);
  }
}
