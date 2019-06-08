import {Component} from '@angular/core';
import {AspectRatio, Duration, Mode, PixelDensity, SettingsService} from './settings.service';
import {interval, Observable} from 'rxjs';
import {finalize, takeWhile} from 'rxjs/operators';
import * as screenfull from 'screenfull';
import {Screenfull} from 'screenfull';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modes = Object.values(Mode);
  aspectRatios = Object.values(AspectRatio);
  durations = Object.values(Duration);
  pixelDensities = Object.values(PixelDensity);

  showBoard = false;
  advancedSettingsVisible = false;
  modeSelection = Mode.blackAndWhite;
  aspectRatioSelection = AspectRatio.sixteenByNine;
  durationSelection = Duration.twentyMinutes;
  enableCSSTransitions = false;
  pixelDensitySelection = PixelDensity.low;

  tick: Observable<number>;
  nextBlockToClear = 0;
  amountOfBlocks: number;

  constructor(private settingsService: SettingsService) {
    this.aspectRatioSelection = this.settingsService.calculateAspectRatio();
  }

  startApp(event) {
    event.preventDefault();
    this.settingsService.mode = this.modeSelection;
    this.settingsService.duration = SettingsService.minutesToMilliseconds(this.durationSelection);

    this.settingsService.enableCSSTransition = this.enableCSSTransitions;
    this.settingsService.pixelDensity = this.pixelDensitySelection;
    this.settingsService.aspectRatio = this.aspectRatioSelection;

    this.amountOfBlocks = this.settingsService.getAmountOfBlocks();

    this.showBoard = true;

    const sf = (screenfull as Screenfull);
    if (sf.enabled) {
      sf.request()
        .then(() => this.startTick());
    } else {
      this.startTick();
    }
  }

  clickOnBoard(clickEvent) {
    if (clickEvent.detail === 5) {
      window.location.reload();
    }
  }

  private startTick() {
    this.tick = interval(this.settingsService.duration / this.amountOfBlocks);
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
