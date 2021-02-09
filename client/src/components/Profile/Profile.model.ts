export interface UserProfile {
  user_id: number;
  nickName: string;
  level_id: number;
  exp: number;
  cur_user_deck_id: number;
  countCards: number;
  level?: number;
}

export interface Level {
  level_id: number;
  level: number;
  exp_to_lvl: number;
  exp_total: number;
}
