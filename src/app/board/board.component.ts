import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../model/Board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  board: Board = new Board();

  constructor() { }

  ngOnInit(): void {
  }

  addBid(bid:string) {
    this.board.biddingSequence.addBid(bid);
  }

}
