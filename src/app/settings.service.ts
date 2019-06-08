import { Injectable } from '@angular/core';

export enum Mode {
  blackAndWhite = 'Black and white',
  color = 'Color'
}

export enum AspectRatio {
  sixteenByNine = '16:9',
  sixteenByTen = '16:10'
}

export enum Duration {
  tenMinutes = '10',
  fifteenMinutes = '15',
  twentyMinutes = '20',
  twentyFiveMinutes = '25',
  thirtyMinutes = '30',
}

export enum PixelDensity {
  low = 'Low',
  medium = 'Medium',
  high = 'High'
}

const PIXEL_DENSITY_PRESET = {
  [AspectRatio.sixteenByNine]: {
    [PixelDensity.low]: {
      rows: 27,
      blocks: 1296,
    },
    [PixelDensity.medium]: {
      rows: 72,
      blocks: 9216,
    },
    [PixelDensity.high]: {
      rows: 90,
      blocks: 14400,
    },
  },
  [AspectRatio.sixteenByTen]: {
    [PixelDensity.low]: {
      rows: 30,
      blocks: 1440,
    },
    [PixelDensity.medium]: {
      rows: 80,
      blocks: 10240,
    },
    [PixelDensity.high]: {
      rows: 100,
      blocks: 16000,
    },
  },
};

const BLOCK_STARTING_COLOR = {
  [Mode.blackAndWhite]: 'white',
  [Mode.color]: 'black'
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  mode: Mode = Mode.blackAndWhite;
  aspectRatio: AspectRatio = AspectRatio.sixteenByNine;
  duration = SettingsService.minutesToMilliseconds(Duration.twentyMinutes);
  enableCSSTransition = false;
  pixelDensity = PixelDensity.low;

  static minutesToMilliseconds(minutes: string) {
    return +minutes * 60 * 1000;
  }

  constructor() {}

  getStartingColor() {
    return BLOCK_STARTING_COLOR[this.mode];
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
    return PIXEL_DENSITY_PRESET[this.aspectRatio][this.pixelDensity].rows;
  }

  // https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
  // https://docs.google.com/spreadsheets/d/10Ta8nt709B7T2rw074hHcmhqX27MusivgRSJGgZzkP0/edit#gid=114369331
  getAmountOfBlocks() {
    return PIXEL_DENSITY_PRESET[this.aspectRatio][this.pixelDensity].blocks;
  }
}
