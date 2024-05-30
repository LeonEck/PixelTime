import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
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
  host: {
    '[style.background-color]': 'color()',
    '[class.enableTransition]': 'settingsService.enableCSSTransition()',
  },
})
export class BlockComponent {
  settingsService = inject(SettingsService);

  color = input('');
}
