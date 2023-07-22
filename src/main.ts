import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NgZone, ɵNoopNgZone } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: NgZone,
      useClass: ɵNoopNgZone,
    },
  ],
}).catch((err) => console.error(err));
