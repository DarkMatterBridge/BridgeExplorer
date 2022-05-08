import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BNode} from "../model/BNode";

export interface DialogData {
  bnode: BNode;
}

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-sequences.component.html',
  styleUrls: ['./bid-sequences.component.scss']
})

export class BidSequencesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

}
