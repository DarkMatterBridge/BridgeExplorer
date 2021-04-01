import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import { ContainerComponent } from './container/container.component';
import { BidLineComponent } from './bid-line/bid-line.component';
import { BidListComponent } from './bid-list/bid-list.component';
import { BidJarComponent } from './bid-jar/bid-jar.component';
import { BnodeSequenceComponent } from './bnode-sequence/bnode-sequence.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BidLineComponent,
    BidListComponent,
    BidJarComponent,
    BnodeSequenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
