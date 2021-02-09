export interface ArrowButton {
  NAME: string;
  IMG: string;
  POS_X: number;
  POS_Y: number;
}

export interface ControlButton {
  NAME: string;
  IMG: string;
  PROMPT: string;
  POS_X: number;
  POS_Y: number;
  PROMPT_X: number;
  PROMPT_Y: number;
}

export interface ButtonSettings {
  NORMAL_SCALE: number;
  RISE_SCALE: number;
  TINT_CLICK: number;
}