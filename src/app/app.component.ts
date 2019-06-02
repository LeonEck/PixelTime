import {Component} from '@angular/core';
import {Mode, SettingsService} from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private settingsService: SettingsService) {
    this.settingsService.mode = Mode.color;
  }
}
