import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Mode, SettingsService } from '../settings.service';
import { Block, BlockComponent } from '../block/block.component';

interface Row {
  id: number;
  blocks: Block[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [BlockComponent],
})
export class BoardComponent {
  settingsService = inject(SettingsService);
  changeDetectorRef = inject(ChangeDetectorRef);

  rows: Row[] = [];
  blocks: Block[] = [];
  amountOfRows = this.settingsService.getAmountOfRows();
  amountOfBlocksPerRow =
    this.settingsService.getAmountOfBlocks() / this.amountOfRows;

  private static shuffle(a: Block[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  constructor() {
    for (let i = 0; i < this.amountOfRows; i++) {
      const blocksForRow = [];
      for (let j = 0; j < this.amountOfBlocksPerRow; j++) {
        const block = {
          id: `${i}-${j}`,
          color: this.settingsService.getStartingColor(),
        };
        this.blocks.push(block);
        blocksForRow.push(block);
      }
      this.rows.push({
        id: i,
        blocks: blocksForRow,
      });
    }
    BoardComponent.shuffle(this.blocks);

    this.settingsService.nextBlockToClear.subscribe((value) => {
      if (value === -1) {
        this.timerFinished();
      } else {
        this.blocks[value].color = this.settingsService.getNewColor();
      }
      this.changeDetectorRef.detectChanges();
    });
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
