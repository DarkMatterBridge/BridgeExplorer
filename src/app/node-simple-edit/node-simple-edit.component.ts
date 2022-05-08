import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {MatDialog} from "@angular/material/dialog";
import {BidSequencesComponent} from "../bid-sequences/bid-sequences.component";

@Component({
  selector: 'app-node-simple-edit',
  templateUrl: './node-simple-edit.component.html',
  styleUrls: ['./node-simple-edit.component.scss']
})
export class NodeSimpleEditComponent implements OnInit {

  @Input()
  bnode!: BNode;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  showLinkedDetails(): void {

    const dialogRef = this.dialog.open(BidSequencesComponent,
      {
        data: { bnode: this.bnode },
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
