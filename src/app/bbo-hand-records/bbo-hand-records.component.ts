import { Component, OnInit } from '@angular/core';
import {CrossOriginService} from "../cross-origin.service";
import {BridgeRespsonse} from "../model/BridgeRespsonse";

@Component({
  selector: 'app-bbo-hand-records',
  templateUrl: './bbo-hand-records.component.html',
  styleUrls: ['./bbo-hand-records.component.scss']
})
export class BboHandRecordsComponent implements OnInit {

  url = "";
  response = "";
  constructor(private crossOriginService: CrossOriginService) { }

  ngOnInit(): void {
  }


  loadUrl() {
    this.crossOriginService.loadFromUrl(this.url, (e: string) => this.getResponse(e));
  }


  getResponse(response: string) {
    this.response = response;
  }

}
