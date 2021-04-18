import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";

@Component({
  selector: '[app-bid-item]',
  templateUrl: './bid-item.component.html',
  styleUrls: ['./bid-item.component.scss']
})
export class BidItemComponent implements OnInit {

  @Input()
  bnode!: BNode ;
  @Input()
  subject!: Subject<BNode>;
  @Input()
  newBid = false ;
  @Input()
  bidEditable = false ;

  @Output() $addOrDeleteNode = new EventEmitter<BNode>();

  constructor() {
    this.bnode = new BNode("", [], "");
  }

  ngOnInit(): void {
  }

  selectBid(bn: BNode) {
    this.subject.next(bn);
//    this.selectNode.emit(bn);
  }
  addOdeleteBid(bn: BNode) {
    this.$addOrDeleteNode.next(bn);
  }

}
