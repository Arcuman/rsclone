import {Card, getUserDeckCards} from '@/resources/Card/card.models';
import { Socket } from 'socket.io';
import {Player} from '@/resources/Game/Player/player.model';
import {MAX_HEALTH, NUMBER_OF_HAND_CARDS, START_MANA} from '@/resources/Game/constants';

function shuffleCards(array:Card[]):Card[] {
  return array.map(a  => [Math.random(), a])
    .sort((a, b) => <number>a[0] - <number>b[0])
    .map(a => <Card>a[1]);
}

export function getCardById(player: Player, id:number): Card{
  // eslint-disable-next-line no-console
  console.log(player.tableCards);
  const resultCard = player.tableCards.find(card  => card.id === id);
  if (resultCard === undefined || resultCard === null) {
    throw new TypeError(`Player with id ${player.userId} does not have a card with id ${id}`);
  }
  return resultCard;
}

export async function createPlayer(userId:number, socket: Socket) : Promise<Player>{
  const cards : Array<Card> = await getUserDeckCards(userId);
  const deckCards : Array<Card> = shuffleCards(cards);
  const handCards : Array<Card> = [];
  for (let i = 0; i < NUMBER_OF_HAND_CARDS;i += 1){
    handCards.push(<Card>deckCards.pop());
  }

  return {
    userId,
    health: MAX_HEALTH,
    maxMana: START_MANA,
    currentMana: START_MANA,
    socket,
    deckCards,
    handCards,
    tableCards : [],
  };
}
