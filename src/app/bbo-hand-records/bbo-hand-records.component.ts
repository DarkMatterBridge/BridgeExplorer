import { Component, OnInit } from '@angular/core';
import {CrossOriginService} from "../cross-origin.service";
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-bbo-hand-records',
  templateUrl: './bbo-hand-records.component.html',
  styleUrls: ['./bbo-hand-records.component.scss']
})
export class BboHandRecordsComponent implements OnInit {

  url = "https://www.bridgebase.com/myhands/hands.php?tourney=TT%3A31123%3A%2Cb%3D6%2Cr%3D5%2Cv%3D2%3A%2C-1621617668-&username=roesrath";
  response = "";
  parsed = "";
  selector = "table"
  constructor(private crossOriginService: CrossOriginService) { }

  ngOnInit(): void {
  }


  loadUrl() {
    this.crossOriginService.loadFromUrl(this.url, (e: string) => this.getResponse(e));
  }


  getResponse(response: string) {
    this.response = response;
  }

  parse() {
    let c = cheerio.load(this.response);
    let parsed = c(this.selector);
    console.log(parsed);
    parsed.each( (idx, elem) => { console.log( c(elem).attr('onclick'))})
    this.parsed = parsed.text();

  }
}
