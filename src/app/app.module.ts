import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlockComponent } from './block/block.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [AppComponent, BlockComponent, BoardComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
