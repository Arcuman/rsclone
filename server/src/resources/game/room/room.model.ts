import {Player} from '@/resources/game/player/player.model';

export interface Room {
  id: string;
  isPlayerOneTurn: boolean;
  players: Array<Player>;
  newRound: boolean;
  timer: NodeJS.Timeout | null;
  countDown: number;
  setCountDown(value: number) : void;
  setIsPlayerOneTurn(value: boolean) : void;
  setNewRound(value: boolean) : void;
}
