import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Mode, SettingsService} from '../settings.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnChanges {

  @Input() nextBlockToClear: number;

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
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'nextBlockToClear') {
          if (changes.nextBlockToClear.currentValue === -1) {
            this.timerFinished();
          } else {
            this.blocks[changes.nextBlockToClear.currentValue].color = this.settingsService.getNewColor();
          }
        }
      }
    }
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
