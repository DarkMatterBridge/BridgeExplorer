import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Board} from '../model/Board';
import {BridgeRespsonse} from '../model/BridgeRespsonse';
import {CrossOriginService} from '../cross-origin.service';

@Component({
  selector: 'app-dd-tricks',
  templateUrl: './dd-tricks.component.html',
  styleUrls: ['./dd-tricks.component.scss']
})
export class DdTricksComponent implements OnInit, OnChanges {

  @Input() board: Board = new Board();

  ddtricks = ''; // contains all tricks as string for each direction/strain
  urlBridgewebs = 'https://dds.bridgewebs.com/cgi-bin/bsol2/ddummy?request=m&dealstr=';
  postfix = '&vul=None';

  ddTrickTable: string[][] = [];
  direction = ['N', 'S', 'E', 'W'];

  constructor(private crossOriginService: CrossOriginService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.ddtricks = '';
    this.ddTrickTable = [];
  }

  getDDAnalysis(): void {
    const dealstring = this.board.constructDealString('x');
    const url = this.urlBridgewebs + dealstring + this.postfix;
    // this.crossOriginService.loadFromUrlViaMessage(url, (e: string) => this.showResponse(e));
    this.crossOriginService.loadDirectFromUrl(url).subscribe( response => this.showResponse(response));
  }

  parseDDTricks(): void {
    for (let i = 0; i < 4; i++) {
      this.ddTrickTable[i] = [];
      for (let j = 0; j < 5; j++) {
        this.ddTrickTable[i][j] = this.ddtricks.charAt(i * 5 + j);
        if (this.ddTrickTable[i][j] === 'a') {
          this.ddTrickTable[i][j] = '10';
        }
        if (this.ddTrickTable[i][j] === 'b') {
          this.ddTrickTable[i][j] = '11';
        }
        if (this.ddTrickTable[i][j] === 'c') {
          this.ddTrickTable[i][j] = '12';
        }
        if (this.ddTrickTable[i][j] === 'd') {
          this.ddTrickTable[i][j] = '13';
        }
      }
    }
  }

  showResponse(response: string): void {
    const br = JSON.parse(response) as BridgeRespsonse;
    alert(response);
    this.ddtricks = br.sess.ddtricks;
    this.parseDDTricks();
  }

}
