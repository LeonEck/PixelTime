import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SettingsService} from '../settings.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent implements OnChanges, OnInit {

  @Input() color: string;
  @HostBinding('style.background-color') backgroundColor = '';
  @HostBinding('class.enableTransition') enableTransition = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.enableTransition = this.settingsService.enableCSSTransition;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'color') {
          this.backgroundColor = changes.color.currentValue;
        }
      }
    }
  }

}
