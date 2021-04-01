import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BidLineComponent} from "./bid-line/bid-line.component";

const  routes: Routes = [
  {path: 'biddingsystem', component: BidLineComponent},
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
