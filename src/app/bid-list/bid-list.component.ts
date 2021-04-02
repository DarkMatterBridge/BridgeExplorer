import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {

  @Input()
  bnode!: BNode;
  @Input()
  subject!: Subject<BNode>;

  constructor() {
  }

  ngOnInit(): void {
  }

  setBnode(bn: BNode) {
    this.bnode = bn;
    this.subject.next(this.bnode);
  }
}
