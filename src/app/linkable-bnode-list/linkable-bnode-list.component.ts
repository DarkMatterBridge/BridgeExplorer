import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-linkable-bnode-list',
  templateUrl: './linkable-bnode-list.component.html',
  styleUrls: ['./linkable-bnode-list.component.scss']
})
export class LinkableBnodeListComponent implements OnInit {

  @Input()
  linkableBnodes!: BNode[];

  @Output() linkNodeEvent = new EventEmitter<BNode | undefined>();

  constructor() {
  }

  ngOnInit(): void {
  }

  linkNode(bn: BNode) {
    this.linkNodeEvent.emit(bn);
  }

}
