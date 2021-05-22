import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BidJarComponent} from "./bid-jar/bid-jar.component";
import {LinLoaderComponent} from "./lin-loader/lin-loader.component";
import {DealViewComponent} from "./deal-view/deal-view.component";
import {BoardEditorComponent} from "./board-editor/board-editor.component";
import {BboHandRecordsComponent} from "./bbo-hand-records/bbo-hand-records.component";

const  routes: Routes = [
  {path: 'biddingsystem', component: BidJarComponent},
  {path: 'dealview', component: DealViewComponent},
  {path: 'edit', component: BoardEditorComponent},
  {path: 'bborecords', component: BboHandRecordsComponent},
  {path: 'lin', component: LinLoaderComponent}, ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
