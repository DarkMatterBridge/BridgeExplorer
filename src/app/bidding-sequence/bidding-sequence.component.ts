import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BiddingSequence} from "../model/BiddingSequence";

@Component({
  selector: 'app-bidding-sequence',
  templateUrl: './bidding-sequence.component.html',
  styleUrls: ['./bidding-sequence.component.scss']
})
export class BiddingSequenceComponent implements OnInit, OnChanges {

  @Input()
  biddingSequence: BiddingSequence = new BiddingSequence();

  biddingStart = 0;
  biddingEnd = 0;
  numbers = new Array<number>();

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.biddingSequence.dealer.length > 0) {
      switch (this.biddingSequence.dealer) {
        case "W":
          this.biddingStart = 0;
          break;
        case "N":
          this.biddingStart = 1;
          break;
        case "E":
          this.biddingStart = 2;
          break;
        case "S":
          this.biddingStart = 3;
          break;
      }
      this.biddingEnd = this.biddingSequence.bids.length + this.biddingStart;
      let max = this.biddingEnd / 4;
      this.numbers = new Array();
      for (let i=0; i<max; i++)
        this.numbers[i] = i;
    }

  }

}