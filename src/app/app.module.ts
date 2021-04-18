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
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BidItemComponent } from './bid-item/bid-item.component';
import { LinLoaderComponent } from './lin-loader/lin-loader.component';
import { HandComponent } from './hand/hand.component';
import { BoardComponent } from './board/board.component';
import { BiddingSequenceComponent } from './bidding-sequence/bidding-sequence.component';
import { LinkableBnodeListComponent } from './linkable-bnode-list/linkable-bnode-list.component';
import { NodeSimpleEditComponent } from './node-simple-edit/node-simple-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BidLineComponent,
    BidListComponent,
    BidJarComponent,
    BnodeSequenceComponent,
    BidItemComponent,
    LinLoaderComponent,
    HandComponent,
    BoardComponent,
    BiddingSequenceComponent,
    LinkableBnodeListComponent,
    NodeSimpleEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
