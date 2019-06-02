import {Component} from '@angular/core';
import {AspectRatio, Mode, SettingsService} from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showBoard = false;
  modeSelection = 'blackAndWhite';
  aspectRatioSelection = 'nine';
  durationSelection = '20';

  constructor(private settingsService: SettingsService) {
    this.settingsService.mode = Mode.color;
  }

  startApp(event) {
    event.preventDefault();
    switch (this.modeSelection) {
      case 'blackAndWhite':
        this.settingsService.mode = Mode.blackAndWhite;
        break;
      case 'color':
        this.settingsService.mode = Mode.color;
        break;
    }
    switch (this.aspectRatioSelection) {
      case 'nine':
        this.settingsService.aspectRatio = AspectRatio.nine;
        break;
      case 'ten':
        this.settingsService.aspectRatio = AspectRatio.ten;
        break;
    }

    this.settingsService.duration = +this.durationSelection * 60 * 1000;

    this.showBoard = true;
  }
}
