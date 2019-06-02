import {Component, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnChanges {

  @Input() color: string;
  @HostBinding('style.background-color') backgroundColor = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const newColor = changes.color;
    if (newColor) {
      this.backgroundColor = newColor.currentValue;
    }
  }

}
