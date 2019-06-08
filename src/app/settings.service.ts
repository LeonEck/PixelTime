import { Injectable } from '@angular/core';

export enum Mode {
  color,
  blackAndWhite
}

export enum AspectRatio {
  nine = '16:9',
  ten = '16:10'
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  mode: Mode = Mode.blackAndWhite;
  aspectRatio: AspectRatio = AspectRatio.nine;
  duration = 1200000;
  enableCSSTransition = false;

  pixelDensity = 'low';
  pixelDensityPreset = {
    '16:9': {
      low: {
        rows: 27,
        blocks: 1296,
      },
      medium: {
        rows: 72,
        blocks: 9216,
      },
      high: {
        rows: 90,
        blocks: 14400,
      },
    },
    '16:10': {
      low: {
        rows: 30,
        blocks: 1440,
      },
      medium: {
        rows: 80,
        blocks: 10240,
      },
      high: {
        rows: 100,
        blocks: 16000,
      },
    },
  };

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
    return this.pixelDensityPreset[this.aspectRatio][this.pixelDensity].rows;
  }

  // https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
  // https://docs.google.com/spreadsheets/d/10Ta8nt709B7T2rw074hHcmhqX27MusivgRSJGgZzkP0/edit#gid=114369331
  getAmountOfBlocks() {
    return this.pixelDensityPreset[this.aspectRatio][this.pixelDensity].blocks;
  }
}
