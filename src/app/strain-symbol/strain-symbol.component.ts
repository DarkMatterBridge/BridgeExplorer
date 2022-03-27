import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-strain-symbol',
  templateUrl: './strain-symbol.component.html',
  styleUrls: ['./strain-symbol.component.scss']
})
export class StrainSymbolComponent implements OnInit, OnChanges {

  constructor() {
  }

  static symbols = ['♣', '♦', '♥', '♠', 'NT'];

  @Input() strain = '';
  @Input() suitNo = -1;

  class = '';
  symbol: string | undefined;
  level = '';
  symbolMap: any = {C: '♣', D: '♦', H: '♥', S: '♠', N: 'NT', NT: 'NT'};

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.level = '';
    if (this.suitNo >= 0) {
      this.handleSuitNo(this.suitNo);
    }
    else {
      this.handleBidOrStrain();
    }
  }

  handleBidOrStrain(): void {
    if (this.strain === '0') {
      this.symbol = '▶';
      return;
    }
    if (this.strain.isStrain()) {  // a cards symbol or N (i.e. NT)
      this.symbol = this.symbolMap[this.strain];
      this.handleSuitChar(this.strain);
      return;
    }

    if (!this.strain.isBid()) {   // no regular bid
      this.symbol = this.strain;
      this.class = 'nobid';
      return;
    }

    if (!this.strain.isContractBid()) {  // thiat is then P, X or XX
      this.symbol = this.strain;
      this.class = 'black';
      return;
    }
    // now at last: the normal bid, i.e. 2S or 3N
    this.level = this.strain.charAt(0);
    this.symbol = this.symbolMap[this.strain.charAt(1)];
    this.handleSuitChar(this.strain.charAt(1));
  }

  handleSuitChar(suit: string): void {
    if (suit === 'H' || suit === 'D') {
      this.class = 'red';
    }
    if (suit === 'C' || suit === 'S') {
      this.class = 'blue';
    }
    if (suit === 'N' || suit === 'NT') {
      this.class = 'black';
    }
  }

  handleSuitNo(suitNo: number): void {
    if (suitNo === 1 || suitNo === 2) {
      this.class = 'red';
    }
    if (suitNo === 0 || suitNo === 3) {
      this.class = 'blue';
    }
    if (suitNo === 4) {
      this.class = 'black';
    }
    this.symbol = StrainSymbolComponent.symbols[this.suitNo];
  }

}

