import { SCENES } from '@/components/Game/constant';
import Phaser from 'phaser';

import { create } from './Profile.services';

export class ProfileScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.PROFILE,
      active: false,
      visible: false,
    });
  }

  create(): void {
    create(this);
  }
}
