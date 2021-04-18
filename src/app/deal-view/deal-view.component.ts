import { Component, OnInit } from '@angular/core';
import {Board} from "../model/Board";
import {Deal} from "../model/Deal";

@Component({
  selector: 'app-deal-view',
  templateUrl: './deal-view.component.html',
  styleUrls: ['./deal-view.component.scss']
})
export class DealViewComponent implements OnInit {

  board: Board;
  deal: Deal;

  constructor() {
    this.board = new Board();
    this.deal = new Deal();
      }

  ngOnInit(): void {
    this.deal.shuffle();
    this.board = this.deal.getBoard();

  }

}
