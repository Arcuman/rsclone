import { SET_ORIGIN, TIMER_LABEL } from './constants';

export function createTimer(scene: Phaser.Scene): Phaser.GameObjects.Text {
  const timerLabel = scene.add
    .text(
      TIMER_LABEL.POSITION.POS_X,
      TIMER_LABEL.POSITION.POS_Y,
      TIMER_LABEL.DEFAULT_EMPTY_STRING,
      {
        fontSize: TIMER_LABEL.STYLE.FONT_SIZE,
        fontFamily: TIMER_LABEL.STYLE.FONT_FAMILY,
        color: TIMER_LABEL.STYLE.COLOR,
      },
    )
    .setOrigin(SET_ORIGIN.TIMER_LABEL_TEXT);
  return timerLabel;
}
