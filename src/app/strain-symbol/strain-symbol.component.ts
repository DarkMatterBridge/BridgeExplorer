import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-strain-symbol',
  templateUrl: './strain-symbol.component.html',
  styleUrls: ['./strain-symbol.component.scss']
})
export class StrainSymbolComponent implements OnInit, OnChanges {

  @Input() strain: string = "";
  @Input() suitNo = -1;

  class = "";
  symbol: string | undefined;
  level = "";

  static symbols = ['♣', '♦', '♥', '♠', 'NT'];
  symbolMap: any = {'C': '♣', 'D': '♦', 'H': '♥', 'S': '♠', 'N': 'NT', 'NT': 'NT', 'P': 'P'};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.suitNo >= 0)
      this.handleSuitNo();
    else
      this.handleBidOrStrain();
  }

  handleBidOrStrain() {
    if (this.strain.length == 1) {
      this.symbol = this.strain[0];
      this.class = "nobid";
      return;
    }
    if (this.strain.length > 2) {
      this.symbol = this.strain;
      this.class = "nobid";
      return;
    }
    let s = this.strain;
    if (this.strain.length > 1) {
      this.level = this.strain.charAt(0);
      s = this.strain.charAt(1);
    }
    if (s == "H" || s == "D")
      this.class = "red";
    if (s == "C" || s == "S")
      this.class = "blue";
    this.symbol = this.symbolMap[s];
  }

  handleSuitNo() {
    if (this.suitNo == 1 || this.suitNo == 2)
      this.class = "red";
    if (this.suitNo == 0 || this.suitNo == 3)
      this.class = "blue";
    this.symbol = StrainSymbolComponent.symbols[this.suitNo];
  }

}

