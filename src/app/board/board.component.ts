import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Mode, SettingsService} from '../settings.service';
import {Block} from '../block/block.component';

interface Row {
  blocks: Block[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  @Input()
  set nextBlockToClear(value: number) {
    if (value === -1) {
      this.timerFinished();
    } else {
      this.blocks[value].color = this.settingsService.getNewColor();
    }
  }

  rows: Row[] = [];
  blocks: Block[] = [];
  amountOfRows = this.settingsService.getAmountOfRows();
  amountOfBlocksPerRow = this.settingsService.getAmountOfBlocks() / this.amountOfRows;

  private static shuffle(a: Block[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  constructor(private settingsService: SettingsService) {
    for (let i = 0; i < this.amountOfRows; i++) {
      const blocksForRow = [];
      for (let j = 0; j < this.amountOfBlocksPerRow; j++) {
        const block = {
          color: this.settingsService.getStartingColor()
        };
        this.blocks.push(block);
        blocksForRow.push(block);
      }
      this.rows.push({
        blocks: blocksForRow
      });
    }
    BoardComponent.shuffle(this.blocks);
  }

  private timerFinished() {
    if (this.settingsService.mode === Mode.color) {
      // @ts-ignore
      const newRandomColor = randomColor();
      this.blocks.forEach((block) => {
        block.color = newRandomColor;
      });
    }
  }
}
