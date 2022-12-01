import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AspectRatio,
  Duration,
  Mode,
  PixelDensity,
  SettingsService,
} from './settings.service';
import { interval, Observable, finalize, takeWhile } from 'rxjs';
import screenfull from 'screenfull';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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

  tick: Observable<number> | undefined;
  nextBlockToClear = 0;
  amountOfBlocks = 0;

  constructor(
    private settingsService: SettingsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.aspectRatioSelection = this.settingsService.calculateAspectRatio();
  }

  startApp(event: any) {
    event.preventDefault();
    this.settingsService.mode = this.modeSelection;
    this.settingsService.duration = SettingsService.minutesToMilliseconds(
      this.durationSelection
    );

    this.settingsService.enableCSSTransition = this.enableCSSTransitions;
    this.settingsService.pixelDensity = this.pixelDensitySelection;
    this.settingsService.aspectRatio = this.aspectRatioSelection;

    this.amountOfBlocks = this.settingsService.getAmountOfBlocks();

    this.showBoard = true;

    if (screenfull.isEnabled) {
      screenfull.request().then(() => this.startTick());
    } else {
      this.startTick();
    }
    this.changeDetectorRef.detectChanges();
  }

  clickOnBoard(clickEvent: any) {
    if (clickEvent.detail === 5) {
      window.location.reload();
    }
  }

  toggleSettingsVisibility() {
    this.advancedSettingsVisible = !this.advancedSettingsVisible;
    this.changeDetectorRef.detectChanges();
  }

  private startTick() {
    this.changeDetectorRef.detach();
    this.tick = interval(this.settingsService.duration / this.amountOfBlocks);
    this.tick
      .pipe(
        takeWhile((value) => value < this.amountOfBlocks),
        finalize(() => {
          this.nextBlockToClear = -1;
          this.changeDetectorRef.detectChanges();
        })
      )
      .subscribe((value) => {
        this.nextBlockToClear = value;
        this.changeDetectorRef.detectChanges();
      });
  }

  updateMode($event: any) {
    this.modeSelection = $event.target.value;
  }

  updateDurationSelection($event: any) {
    this.durationSelection = $event.target.value;
  }

  toggleCSSTransitions($event: any) {
    this.enableCSSTransitions = $event.target.checked;
  }

  updateDensitySelection($event: any) {
    this.pixelDensitySelection = $event.target.value;
  }

  updateAspectRatioSelection($event: any) {
    this.aspectRatioSelection = $event.target.value;
  }
}
