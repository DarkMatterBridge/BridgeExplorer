import {Component, OnInit} from '@angular/core';
import {Board} from "../model/Board";

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


}
