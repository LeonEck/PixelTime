import {Component} from '@angular/core';
import {AspectRatio, Mode, SettingsService} from './settings.service';
import {interval, Observable} from 'rxjs';
import {finalize, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBoard = false;
  experimentalSettingsVisible = false;
  modeSelection = 'blackAndWhite';
  aspectRatioSelection = 'nine';
  durationSelection = '20';
  enableCSSTransitions = false;
  pixelDensitySelection = 'low';

  tick: Observable<number>;
  countdownTime: number;
  amountOfBlocks: number;
  nextBlockToClear = 0;

  constructor(private settingsService: SettingsService) {
    this.settingsService.mode = Mode.color;
  }

  startApp(event) {
    event.preventDefault();
    switch (this.modeSelection) {
      case 'blackAndWhite':
        this.settingsService.mode = Mode.blackAndWhite;
        break;
      case 'color':
        this.settingsService.mode = Mode.color;
        break;
    }
    switch (this.aspectRatioSelection) {
      case 'nine':
        this.settingsService.aspectRatio = AspectRatio.nine;
        break;
      case 'ten':
        this.settingsService.aspectRatio = AspectRatio.ten;
        break;
    }

    this.settingsService.duration = +this.durationSelection * 60 * 1000;

    this.settingsService.enableCSSTransition = this.enableCSSTransitions;

    this.settingsService.pixelDensity = this.pixelDensitySelection;

    this.amountOfBlocks = this.settingsService.getAmountOfBlocks();
    this.countdownTime = this.settingsService.duration;
    this.tick = interval(this.countdownTime / this.amountOfBlocks);

    this.showBoard = true;

    this.tick
      .pipe(
        takeWhile(value => value < this.amountOfBlocks),
        finalize(() => this.nextBlockToClear = -1)
      )
      .subscribe((value) => {
        this.nextBlockToClear = value;
      });
  }
}
