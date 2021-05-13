import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Board} from "../model/Board";
import {CrossOriginService} from "../cross-origin.service";
import {strict} from "assert";
import {stringify} from "querystring";
import {BridgeRespsonse} from "../model/BridgeRespsonse";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {

  @Input()
  board!: Board;

  biddingBoxVisible = false;

  constructor(private crossOriginService: CrossOriginService) {
  }

  ngOnInit(): void {
    console.log("in bord -comp");
    // console.log(this.board.biddingSequence.bids);
  }

  ngOnChanges() {
  }

  addBid(bid: string) {
    this.board.biddingSequence.addBid(bid);
  }

}
