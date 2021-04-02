import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BidLineComponent} from "./bid-line/bid-line.component";
import {BidJarComponent} from "./bid-jar/bid-jar.component";

const  routes: Routes = [
  {path: 'biddingsystem', component: BidJarComponent},
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
