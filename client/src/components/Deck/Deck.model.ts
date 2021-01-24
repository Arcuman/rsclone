import {Card} from '@/components/Card/Card.model';

export interface Deck {
  user_deck_id: number;
  user_id: number;
  name: string;
  isinitial?: boolean;
  isCurr:boolean;
  cards_count?: number;
  cards?: Card[];
}

export interface PositionInfo {
  IMG_X: number;
  IMG_Y: number;
  TEXT_X: number;
  TEXT_Y: number;
}
  