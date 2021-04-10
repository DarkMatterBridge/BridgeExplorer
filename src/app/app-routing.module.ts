import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BidJarComponent} from "./bid-jar/bid-jar.component";
import {LinLoaderComponent} from "./lin-loader/lin-loader.component";

const  routes: Routes = [
  {path: 'biddingsystem', component: BidJarComponent},
  {path: 'lin', component: LinLoaderComponent}, ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
