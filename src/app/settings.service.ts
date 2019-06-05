import { Injectable } from '@angular/core';

export enum Mode {
  color,
  blackAndWhite
}

export enum AspectRatio {
  nine,
  ten
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  mode: Mode = Mode.blackAndWhite;
  aspectRatio: AspectRatio = AspectRatio.nine;
  duration = 1200000;
  enableCSSTransition = false;

  constructor() { }

  getStartingColor() {
    switch (this.mode) {
      case Mode.color:
        return 'black';
      case Mode.blackAndWhite:
        return 'white';
    }
  }

  getNewColor() {
    switch (this.mode) {
      case Mode.color:
        // @ts-ignore
        return randomColor();
      case Mode.blackAndWhite:
        return 'black';
    }
  }

  getAmountOfRows() {
    switch (this.aspectRatio) {
      case AspectRatio.nine:
        return 27;
      case AspectRatio.ten:
        return 30;
    }
  }

  // https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
  // https://docs.google.com/spreadsheets/d/10Ta8nt709B7T2rw074hHcmhqX27MusivgRSJGgZzkP0/edit#gid=114369331
  getAmountOfBlocks() {
    switch (this.aspectRatio) {
      case AspectRatio.nine:
        return 1296;
      case AspectRatio.ten:
        return 1440;
    }
  }
}
