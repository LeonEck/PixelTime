import {Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tick = interval(1000);

  rows: { blocks: { color: string }[] }[] = [];
  amountOfRows = 72; // 72
  amountOfBlocks = 9216; // 9216 (128 * 72) https://pacoup.com/2011/06/12/list-of-true-169-resolutions/
  amountOfBlocksPerRow = 0;
  blocks: { color: string }[] = [];

  private static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  constructor() {
    this.amountOfBlocksPerRow = this.amountOfBlocks / this.amountOfRows;
    for (let i = 0; i < this.amountOfRows; i++) {
      const blocks = [];
      for (let j = 0; j < this.amountOfBlocksPerRow; j++) {
        const block = {color: 'white'};
        this.blocks.push(block);
        blocks.push(block);
      }
      this.rows.push({blocks});
    }
  }

  ngOnInit() {
    AppComponent.shuffle(this.blocks);
    this.tick
      .pipe(
        takeWhile(value => value < this.blocks.length)
      )
      .subscribe((value) => {
        this.blocks[value].color = 'black';
      });
  }
}
