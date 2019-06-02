import { Injectable } from '@angular/core';

export enum Mode {
  color,
  blackAndWhite
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  mode: Mode = Mode.blackAndWhite;
  duration = 1200000;

  constructor() { }

  getStartingColor() {
    if (this.mode === Mode.blackAndWhite) {
      return 'white';
    } else if (this.mode === Mode.color) {
      return 'black';
    }

    return 'black';
  }

  getNewColor() {
    if (this.mode === Mode.blackAndWhite) {
      return 'black';
    } else if (this.mode === Mode.color) {
      // @ts-ignore
      return randomColor();
    }

    return 'black';
  }
}
