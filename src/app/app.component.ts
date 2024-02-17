import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import {
  AspectRatio,
  Duration,
  Mode,
  PixelDensity,
  SettingsService,
} from './settings.service';
import { interval, Observable, finalize, takeWhile } from 'rxjs';
import screenfull from 'screenfull';
import { NgClass } from '@angular/common';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, BoardComponent],
})
export class AppComponent {
  settingsService = inject(SettingsService);
  changeDetectorRef = inject(ChangeDetectorRef);

  modes = Object.values(Mode);
  aspectRatios = Object.values(AspectRatio);
  durations = Object.values(Duration);
  pixelDensities = Object.values(PixelDensity);

  showBoard = false;
  advancedSettingsVisible = signal(false);
  modeSelection = Mode.blackAndWhite;
  aspectRatioSelection = this.settingsService.calculateAspectRatio();
  durationSelection = Duration.tenMinutes;
  enableCSSTransitions = false;
  pixelDensitySelection = PixelDensity.low;

  tick: Observable<number> | undefined;
  amountOfBlocks = 0;
  amountOfBlocksCleared = 0;
  finishTime = 0;
  timeOfLastTick = -1;

  startApp(event: any) {
    event.preventDefault();
    this.settingsService.mode = this.modeSelection;
    this.settingsService.duration = SettingsService.minutesToMilliseconds(
      this.durationSelection,
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

  toggleSettingsVisibility() {
    this.advancedSettingsVisible.update((currentValue) => !currentValue);
    this.changeDetectorRef.detectChanges();
  }

  private startTick() {
    this.changeDetectorRef.detach();
    // Ideally we want to tick for every block. Since the interval could become inaccurate, we calculate the real amount of blocks to clear each time it ticks.
    this.tick = interval(this.settingsService.duration / this.amountOfBlocks);
    const startTime = performance.now();
    this.finishTime = startTime + this.settingsService.duration;
    this.tick
      .pipe(
        takeWhile(() => this.amountOfBlocksCleared < this.amountOfBlocks),
        finalize(() => {
          this.settingsService.nextBlockToClear.next(-1);
        }),
      )
      .subscribe(() => {
        const currentTime = performance.now();
        if (this.timeOfLastTick < 0) {
          this.timeOfLastTick = currentTime;
        }
        const timeLeft = this.finishTime - currentTime;
        //console.log('timeLeft', timeLeft);
        const amountOfBlocksLeft =
          this.amountOfBlocks - this.amountOfBlocksCleared;
        //console.log('amountOfBlocksLeft', amountOfBlocksLeft);
        const amountOfBlocksThatNeedToBeClearedInAMillisecond =
          amountOfBlocksLeft / timeLeft;
        /*console.log(
          'amountOfBlocksThatNeedToBeClearedInAMillisecond',
          amountOfBlocksThatNeedToBeClearedInAMillisecond,
        );*/
        const millisecondsSinceLastTick = currentTime - this.timeOfLastTick;
        //console.log('millisecondsSinceLastTick', millisecondsSinceLastTick);
        const amountOfBlocksToClearThisTick = Math.round(
          amountOfBlocksThatNeedToBeClearedInAMillisecond *
            millisecondsSinceLastTick,
        );
        /*console.log(
          'amountOfBlocksToClearThisTick',
          amountOfBlocksToClearThisTick,
        );*/

        for (let i = 0; i < amountOfBlocksToClearThisTick; i++) {
          const indexToClear = this.amountOfBlocksCleared + i;
          if (indexToClear < this.amountOfBlocks) {
            this.settingsService.nextBlockToClear.next(indexToClear);
          }
        }

        this.amountOfBlocksCleared += amountOfBlocksToClearThisTick;
        this.timeOfLastTick = currentTime;
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
