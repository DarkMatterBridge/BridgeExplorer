import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PBNObject} from "../model/PBNObject";
import {BNode} from "../model/BNode";
import {SnackBarHarnessFilters} from "@angular/material/snack-bar/testing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LinObject} from "../model/LinObject";

@Component({
  selector: 'app-board-input',
  templateUrl: './board-input.component.html',
  styleUrls: ['./board-input.component.scss']
})
export class BoardInputComponent implements OnInit {

  contentx: string = "";
  pbn: string = "";

  @Output() $giveBoard = new EventEmitter<string>();
  @Output() $givePBN = new EventEmitter<PBNObject>();
  @Output() $giveLin = new EventEmitter<LinObject>();

  constructor(private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  processx() {
    console.log(this.contentx);
    let hands = PBNObject.hands(this.contentx);
    this.$giveBoard.next(this.contentx);
  }

  processAsPBN() {
    let pbnObject = new PBNObject(this.pbn);
    try {
      pbnObject.verify()
    } catch (e: any) {
      this.matSnackBar.open(e.toString(), "", {"duration": 2000});
    }
    this.$givePBN.next(pbnObject);
  }

  processAsLin() {
    let x =  unescape(this.pbn);
    let linObject = new LinObject(x);
    this.$giveLin.next(linObject);
  }
}
