import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BiddingSequence} from "../model/BiddingSequence";

@Component({
  selector: 'app-bidding-sequence',
  templateUrl: './bidding-sequence.component.html',
  styleUrls: ['./bidding-sequence.component.scss']
})
export class BiddingSequenceComponent implements OnInit, OnChanges {

  @Input()
  biddingSequence!: BiddingSequence ;

  @Input()
  count = -1 ; // only needed as input to trigger ngOnChanges

  biddingStart = 0;
  biddingEnd = 0;
  numbers = new Array<number>();

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    console.log("in bidding-sequence -comp");
    console.log(this.biddingSequence.bids);
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
      console.log(this.biddingStart+" "+this.biddingEnd+" "+this.biddingSequence.bids.length);
      let max = this.biddingEnd / 4;
      this.numbers = [];
      for (let i = 0; i < max; i++)
        this.numbers[i] = i;
    }
  }

  addBid(bid: string) {
    this.biddingSequence.bids.push(bid);
    this.biddingEnd++;
    let max = this.biddingEnd / 4;
    this.numbers[max - 1] = max - 1;
  }
}
