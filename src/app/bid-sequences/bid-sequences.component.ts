import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BNode} from '../model/BNode';

export interface DialogData {
  bnode: BNode;
  linkedNodes: BNode[];
  sequences: string[];
}

@Component({
  selector: 'app-sequences',
  templateUrl: './bid-sequences.component.html',
  styleUrls: ['./bid-sequences.component.scss']
})

export class BidSequencesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('INSIDE');
    console.log(data.linkedNodes);
  }

}
