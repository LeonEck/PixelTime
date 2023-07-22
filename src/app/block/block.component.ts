import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import { SettingsService } from '../settings.service';

export interface Block {
  color: string;
}

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BlockComponent implements Block {
  settingsService = inject(SettingsService);

  @HostBinding('style.background-color') @Input() color = '';
  @HostBinding('class.enableTransition') enableTransition =
    this.settingsService.enableCSSTransition;
}
