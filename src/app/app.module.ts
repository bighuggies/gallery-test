import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { PagingControlComponent } from './paging-control/paging-control.component';
import { PhotoListComponent } from './photo-list/photo-list.component';

@NgModule({
  declarations: [AppComponent, PhotoCardComponent, PagingControlComponent, PhotoListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
