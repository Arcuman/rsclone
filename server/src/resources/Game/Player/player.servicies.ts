import {Card, getUserDeckCards} from '@/resources/Card/card.models';
import { Socket } from 'socket.io';
import {Player} from '@/resources/Game/Player/player.model';
import {NUMBER_OF_HAND_CARDS} from '@/resources/Game/constants';

function shuffleCards(array:Card[]):Card[] {
  return array.map(a  => [Math.random(), a])
    .sort((a, b) => <number>a[0] - <number>b[0])
    .map(a => <Card>a[1]);
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
    health: 10,
    maxMana:1,
    currentMana: 1,
    socket,
    deckCards,
    handCards,
  };
}
