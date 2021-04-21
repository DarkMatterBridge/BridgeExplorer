import {Component, OnInit} from '@angular/core';
import {Board} from "../model/Board";
import {Deal} from "../model/Deal";
import {DealCondition} from "../model/DealCondition";

@Component({
  selector: 'app-deal-view',
  templateUrl: './deal-view.component.html',
  styleUrls: ['./deal-view.component.scss']
})
export class DealViewComponent implements OnInit {

  board: Board;
  deal: Deal;
  dealCondition: DealCondition;

  conditionNorth = "";
  maxTries = 100000;


  constructor() {
    this.board = new Board();
    this.deal = new Deal();
    this.dealCondition = new DealCondition();
  }

  ngOnInit(): void {
    this.deal.shuffle();
    this.board = this.deal.getBoard();
  }

  generateBoard(): void {
    this.dealCondition = new DealCondition();
    this.dealCondition.northCondition.parseCondition(this.conditionNorth);

    let n = 0;
    this.deal.shuffle();
    while (!this.dealCondition.checkNorth(this.deal.getDealHand(3)) && n < this.maxTries) {
      n++;
      this.deal.shuffle();
    }
    alert(n);
    this.board = this.deal.getBoard();

  }

}
