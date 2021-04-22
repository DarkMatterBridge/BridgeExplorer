import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Board} from "../model/Board";
import {Deal} from "../model/Deal";
import {DealCondition} from "../model/DealCondition";

@Component({
  selector: 'app-deal-view',
  templateUrl: './deal-view.component.html',
  styleUrls: ['./deal-view.component.scss']
})
export class DealViewComponent implements OnInit, OnChanges {

  board: Board;
  deal: Deal;
  dealCondition: DealCondition;
  @Input() dealConditionSequence: string[] = [];

  parsingNorthOk = true;
  parsingOK: boolean[] = new Array();
  maxTries = 100000;

  constructor() {
    this.board = new Board();
    this.deal = new Deal();
    this.dealCondition = new DealCondition();
    this.parsingOK[0] = this.parsingOK[1] = this.parsingOK[2] = this.parsingOK[3] = true;
  }

  ngOnInit(): void {
    this.deal.shuffle();
    this.board = this.deal.getBoard();
  }

  ngOnChanges(): void {
    this.dealCondition = new DealCondition();
    this.dealCondition.import(this.dealConditionSequence);
    console.log(this.dealConditionSequence);
  }

  generateBoard(): void {
//    const parsed = this.dealCondition.northCondition.importAndParseCondition(this.dealCondition.northCondition.condition);

    if (this.parsingOK[0]&&this.parsingOK[1]&&this.parsingOK[2]&&this.parsingOK[3]) {
      let n = 0;
      this.deal.shuffle();
//      while (!this.dealCondition.checkNorth(this.deal.getDealHand(3)) && n < this.maxTries) {
      while (!this.dealCondition.check(this.deal) && n < this.maxTries) {
        n++;
        this.deal.shuffle();
      }
      alert(n);
      this.board = this.deal.getBoard();
    } else
      alert("Parsing Error");
  }

  parse() {
    this.parsingNorthOk = !this.dealCondition.northCondition.importAndParseCondition(this.dealCondition.northCondition.condition);
  }

  parseDirection(direction: number) {
    this.parsingOK[direction] = this.dealCondition.directionConditions[direction].parseCondition();
  }
}
