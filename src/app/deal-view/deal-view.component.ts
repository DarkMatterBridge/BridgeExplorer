import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Board} from "../model/Board";
import {Deal} from "../model/Deal";
import {DealCondition} from "../model/DealCondition";
import {FileService} from "../services/file.service";
import {BNodeSequence} from "../model/BNodeSequence";
import {BiddingSequence} from "../model/BiddingSequence";

@Component({
  selector: 'app-deal-view',
  templateUrl: './deal-view.component.html',
  styleUrls: ['./deal-view.component.scss']
})
export class DealViewComponent implements OnInit, OnChanges {

  board: Board;
  deal: Deal;
  dealCondition: DealCondition;
  @Input() bNodeSequence: BNodeSequence = new BNodeSequence();


  parsingOK: boolean[] = new Array();
  maxTries = 1000000;
  tries = 0;

  constructor(private fileService: FileService) {
    this.board = new Board();
    this.deal = new Deal();
    this.dealCondition = new DealCondition();
    this.parsingOK[0] = this.parsingOK[1] = this.parsingOK[2] = this.parsingOK[3] = true;
  }

  ngOnInit(): void {
    this.deal.shuffle();
    this.board = this.deal.getBoard();
    this.board.biddingSequence.bids = this.bNodeSequence.bids.slice(1);
    this.board.biddingSequence.dealer = "W";
  }

  ngOnChanges(): void {
    this.dealCondition = new DealCondition();
    this.board = new Board();
    this.parsingOK = this.dealCondition.importNew(this.bNodeSequence.nodes.map(bn => bn.con));
    this.board.biddingSequence.bids = this.bNodeSequence.bids.slice(1);
    this.board.biddingSequence.dealer = "W";
    this.generateBoard(true);
  }

  generateBoard(newTry = true): void {

    if (this.parsingOK[0] && this.parsingOK[1] && this.parsingOK[2] && this.parsingOK[3]) {
      let n = 0;
      if (newTry)
        this.deal.shuffle();
      while (!this.dealCondition.check(this.deal) && n < this.maxTries) {
        n++;
        this.deal.shuffle();
      }
      this.tries = n;
      let newBoard = this.deal.getBoard();
      console.log(this.board.biddingSequence.bids);
      newBoard.biddingSequence = this.board.biddingSequence;
      newBoard.biddingSequence = new BiddingSequence();
       newBoard.biddingSequence.bids = this.bNodeSequence.bids.slice(1);

      this.board = newBoard;
      console.log(this.board.biddingSequence.bids);
    } else
      alert("Parsing Error");
  }

  parseDirection(direction: number) {
    this.parsingOK[direction] = this.dealCondition.directionConditions[direction].parseCondition();
  }

  getTricks() {
    this.fileService.getTricks().subscribe(
      a => alert(a));
  }
}
