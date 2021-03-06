import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {SettingsService} from '../settings.service';

export interface Block {
  color: string;
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent implements Block {

  @HostBinding('style.background-color') @Input() color = '';
  @HostBinding('class.enableTransition') enableTransition = this.settingsService.enableCSSTransition;

  constructor(private settingsService: SettingsService) {}

}
