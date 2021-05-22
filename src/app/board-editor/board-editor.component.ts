import {Component, OnInit} from '@angular/core';
import {Board} from "../model/Board";
import {PBNObject} from "../model/PBNObject";
import {BoardFactory} from "../services/BoardFactory";
import {LinObject} from "../model/LinObject";

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.scss']
})
export class BoardEditorComponent implements OnInit {

  board = new Board();

  constructor() {
  }

  ngOnInit(): void {
  }

  importHands(hands: string) {
    this.board.importFromDealString(hands," ");
  }

  generateBoard(p: PBNObject) {
    this.board = BoardFactory.generateFromPBN(p);
  }
  generateBoardFromLin(l: LinObject) {
    this.board = new Board();
    this.board.importLinObject(l);
  }


}
