import {Component, OnInit} from '@angular/core';
import {PBNObject} from "../model/PBNObject";

@Component({
  selector: 'app-board-input',
  templateUrl: './board-input.component.html',
  styleUrls: ['./board-input.component.scss']
})
export class BoardInputComponent implements OnInit {

  contentx : string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  processx() {
    console.log(this.contentx);
    let hands = PBNObject.hands(this.contentx);
    
    alert(this.contentx+"aa");

  }
}
