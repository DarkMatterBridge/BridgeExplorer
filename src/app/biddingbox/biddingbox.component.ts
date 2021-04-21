import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNode} from "../model/BNode";
import {$a} from "codelyzer/angular/styles/chars";
import {BiddingSequence} from "../model/BiddingSequence";

@Component({
  selector: 'app-biddingbox',
  templateUrl: './biddingbox.component.html',
  styleUrls: ['./biddingbox.component.scss']
})
export class BiddingboxComponent implements OnInit {

  bids: string[][]

  @Input() biddingSequence: BiddingSequence = new BiddingSequence();

  @Output() $addBid = new EventEmitter<string>();

  constructor() {
    this.bids = new Array(7);
    for (let level = 0; level < 7; level++) {
      this.bids[level] = new Array(5);
      this.bids[level][0] = level + 1 + "C";
      this.bids[level][1] = level + 1 + "D";
      this.bids[level][2] = level + 1 + "H";
      this.bids[level][3] = level + 1 + "S";
      this.bids[level][4] = level + 1 + "NT";
    }
  }

  ngOnInit(): void {
  }

  addBid(bid: string) {
    this.$addBid.emit(bid)
  }

}
