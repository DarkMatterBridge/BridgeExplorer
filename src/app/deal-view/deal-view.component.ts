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

  parsingOK: boolean[] = new Array();
  maxTries = 100000;
  tries  = 0;

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
    console.log(this.dealConditionSequence);
    this.dealCondition = new DealCondition();
    this.dealCondition.import(this.dealConditionSequence);
    this.parseDirection(0);
    this.parseDirection(1);
    this.parseDirection(2);
    this.parseDirection(3);
    this.generateBoard();

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
      this.tries = n;
      this.board = this.deal.getBoard();
    } else
      alert("Parsing Error");
  }

  parseDirection(direction: number) {
    this.parsingOK[direction] = this.dealCondition.directionConditions[direction].parseCondition();
  }
}
