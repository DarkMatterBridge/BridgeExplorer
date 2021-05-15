import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PBNObject} from "../model/PBNObject";
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-board-input',
  templateUrl: './board-input.component.html',
  styleUrls: ['./board-input.component.scss']
})
export class BoardInputComponent implements OnInit {

  contentx : string = "";

  @Output() $giveBoard = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  processx() {
    console.log(this.contentx);
    let hands = PBNObject.hands(this.contentx);
    this.$giveBoard.next(this.contentx);

  }
}
