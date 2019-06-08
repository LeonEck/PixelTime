import { Injectable } from '@angular/core';

export enum Mode {
  blackAndWhite = 'Black and white',
  color = 'Color'
}

export enum AspectRatio {
  sixteenByNine = '16:9',
  sixteenByTen = '16:10',
  fourByThree = '4:3'
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
  [AspectRatio.fourByThree]: {
    [PixelDensity.low]: {
      rows: 27,
      blocks: 972,
    },
    [PixelDensity.medium]: {
      rows: 72,
      blocks: 6912,
    },
    [PixelDensity.high]: {
      rows: 90,
      blocks: 10800,
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

  constructor() {
    this.calculateAspectRatio();
  }

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

  // https://stackoverflow.com/questions/1186414/whats-the-algorithm-to-calculate-aspect-ratio-i-need-an-output-like-43-169
  calculateAspectRatio() {
    const w = screen.width;
    const h = screen.height;
    const r = this.gcd(w, h);
    const calculatedAspectRatio = `${w / r}:${h / r}`;
    if (calculatedAspectRatio === '16:9' || calculatedAspectRatio === '9:16') {
      return AspectRatio.sixteenByNine;
    }
    if (calculatedAspectRatio === '16:10' || calculatedAspectRatio === '10:16' ||
        calculatedAspectRatio === '8:5' || calculatedAspectRatio === '5:8') {
      return AspectRatio.sixteenByTen;
    }
    if (calculatedAspectRatio === '4:3' || calculatedAspectRatio === '3:4') {
      return AspectRatio.fourByThree;
    }
    return AspectRatio.sixteenByNine;
  }

  private gcd(a, b) {
    return (b === 0) ? a : this.gcd (b, a % b);
  }
}
