import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Board} from "../model/Board";
import {BridgeRespsonse} from "../model/BridgeRespsonse";
import {CrossOriginService} from "../cross-origin.service";

@Component({
  selector: 'app-dd-tricks',
  templateUrl: './dd-tricks.component.html',
  styleUrls: ['./dd-tricks.component.scss']
})
export class DdTricksComponent implements OnInit, OnChanges {

  @Input() board: Board = new Board();

  ddtricks: string = "";
  urlBridgewebs = "https://dds.bridgewebs.com/cgi-bin/bsol2/ddummy?request=m&dealstr=";
  postfix = "&vul=None";

  ddTricks: string[][] = [];
  direction = ["N","S","E","W"];

  constructor(private crossOriginService: CrossOriginService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.ddtricks = "";
    this.ddTricks = [];
  }

  getDDAnalysis() {
    const dealstring = this.board.constructDealString("x");
    // window.open("https://dds.bridgewebs.com/cgi-bin/bsol2/ddummy?request=m&dealstr=W:J6.742.KQ85.J972x7432.AKQJT95.7.5xA5.6.A964.AQT864xKQT98.83.JT32.K3&vul=None");
    let url = this.urlBridgewebs + dealstring + this.postfix;
    this.crossOriginService.loadFromUrl(url, (e: string) => this.showResponse(e));
  }

  parseDDTricks() {
    for (let i = 0; i < 4; i++) {
      this.ddTricks[i] = [];
      for (let j = 0; j < 5; j++) {
        this.ddTricks[i][j] = this.ddtricks.charAt(i * 5 + j);
        if (this.ddTricks[i][j]==='a')
          this.ddTricks[i][j]="10";
        if (this.ddTricks[i][j]==='b')
          this.ddTricks[i][j]="11";
        if (this.ddTricks[i][j]==='c')
          this.ddTricks[i][j]="12";
        if (this.ddTricks[i][j]==='d')
          this.ddTricks[i][j]="13";
      }
    }
  }

  showResponse(response: string) {
    let br = JSON.parse(response) as BridgeRespsonse;
    alert(response);
    this.ddtricks = br.sess.ddtricks;
    this.parseDDTricks();
  }

}
