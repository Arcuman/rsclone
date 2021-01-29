import { Socket } from 'socket.io';
import { Player } from '@/resources/game/player/player.model';
import { MAX_HEALTH, NUMBER_OF_HAND_CARDS, START_MANA } from '@/resources/game/constants';
import { playerDoesntHaveCard } from '@/resources/game/player/constants';
import { getUserById } from '@/resources/users/user.controller';
import { Deck } from '@/resources/decks/decks.model';
import { getUserDefaultDeck } from '@/resources/decks/decks.controller';
import { Card } from '@/resources/card/card.model';

function shuffleCards(array: Card[]): Card[] {
  return array
    .map(a => [Math.random(), a])
    .sort((a, b) => <number>a[0] - <number>b[0])
    .map(a => <Card>a[1]);
}

export function getCardById(player: Player, id: number): Card {
  const resultCard = player.tableCards.find(card => card.id === id);
  if (resultCard === undefined || resultCard === null) {
    throw new TypeError(playerDoesntHaveCard(player.userId, id));
  }
  return resultCard;
}

export async function createPlayer(userId: number, socket: Socket): Promise<Player> {
  const deck: Deck = await getUserDefaultDeck(userId);
  const { cards } = deck;
  const user = await getUserById(userId);
  const deckCards: Array<Card> = shuffleCards(cards!);
  const handCards: Array<Card> = deckCards.splice(0, NUMBER_OF_HAND_CARDS);

  return <Player>{
    userId,
    name: user.name,
    health: MAX_HEALTH,
    maxMana: START_MANA,
    currentMana: START_MANA,
    socket,
    deckCards,
    handCards,
    tableCards: [],
    setMaxMana(value: number): void {
      this.maxMana = value;
    },
    setCurrentMana(value: number): void {
      this.currentMana = value;
    },
  };
}
