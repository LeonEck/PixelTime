import {Component} from '@angular/core';
import {AspectRatio, Duration, Mode, PixelDensity, SettingsService} from './settings.service';
import {interval, Observable} from 'rxjs';
import {finalize, takeWhile} from 'rxjs/operators';

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
  experimentalSettingsVisible = false;
  modeSelection = Mode.blackAndWhite;
  aspectRatioSelection = AspectRatio.sixteenByNine;
  durationSelection = Duration.twentyMinutes;
  enableCSSTransitions = false;
  pixelDensitySelection = PixelDensity.low;

  tick: Observable<number>;
  nextBlockToClear = 0;

  constructor(private settingsService: SettingsService) {
    this.settingsService.mode = Mode.color;
  }

  startApp(event) {
    event.preventDefault();
    this.settingsService.mode = this.modeSelection;
    this.settingsService.aspectRatio = this.aspectRatioSelection;
    this.settingsService.duration = SettingsService.minutesToMilliseconds(this.durationSelection);

    this.settingsService.enableCSSTransition = this.enableCSSTransitions;
    this.settingsService.pixelDensity = this.pixelDensitySelection;

    const amountOfBlocks = this.settingsService.getAmountOfBlocks();
    this.tick = interval(this.settingsService.duration / amountOfBlocks);

    this.showBoard = true;

    this.tick
      .pipe(
        takeWhile(value => value < amountOfBlocks),
        finalize(() => this.nextBlockToClear = -1)
      )
      .subscribe((value) => {
        this.nextBlockToClear = value;
      });
  }
}
