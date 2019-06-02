import {Component, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {finalize, takeWhile} from 'rxjs/operators';
import {Mode, SettingsService} from '../settings.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  tick: Observable<number>;
  countdownTime: number;

  rows: { blocks: { color: string }[] }[] = [];
  amountOfRows = this.settingsService.getAmountOfRows();
  amountOfBlocks = this.settingsService.getAmountOfBlocks();
  amountOfBlocksPerRow = 0;
  blocks: { color: string }[] = [];

  private static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  constructor(private settingsService: SettingsService) {
    this.countdownTime = this.settingsService.duration;
    this.amountOfBlocksPerRow = this.amountOfBlocks / this.amountOfRows;
    for (let i = 0; i < this.amountOfRows; i++) {
      const blocks = [];
      for (let j = 0; j < this.amountOfBlocksPerRow; j++) {
        const block = {color: this.settingsService.getStartingColor()};
        this.blocks.push(block);
        blocks.push(block);
      }
      this.rows.push({blocks});
    }
    BoardComponent.shuffle(this.blocks);
    this.tick = interval(this.countdownTime / this.amountOfBlocks);
  }

  ngOnInit() {
    this.tick
      .pipe(
        takeWhile(value => value < this.amountOfBlocks),
        finalize(() => this.timerFinished())
      )
      .subscribe((value) => {
        this.blocks[value].color = this.settingsService.getNewColor();
      });
  }

  timerFinished() {
    if (this.settingsService.mode === Mode.color) {
      // @ts-ignore
      const newRandomColor = randomColor();
      this.blocks.forEach((block) => {
        block.color = newRandomColor;
      });
    }
  }
}
