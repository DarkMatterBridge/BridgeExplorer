import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNode} from "../model/BNode";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-linkable-bnode-list',
  templateUrl: './linkable-bnode-list.component.html',
  styleUrls: ['./linkable-bnode-list.component.scss']
})
export class LinkableBnodeListComponent implements OnInit {

  @Input()
  linkableBnodes!: BNode[];

  @Output() linkNodeEvent = new EventEmitter<BNode | undefined>();

  constructor(private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  linkNode(bn: BNode) {
    const r = confirm("Really Link this?");

    if (r == true) {
      this.linkNodeEvent.emit(bn);
      this.matSnackBar.open("Node Linked","",  {"duration": 2000});
    }
  }

}
