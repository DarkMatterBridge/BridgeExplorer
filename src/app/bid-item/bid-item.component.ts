import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";
import {DealHandCondition} from "../model/DealHandCondition";

@Component({
  selector: '[app-bid-item]',
  templateUrl: './bid-item.component.html',
  styleUrls: ['./bid-item.component.scss']
})
export class BidItemComponent implements OnInit {

  @Input()
  bnode!: BNode;
  @Input()
  subject!: Subject<BNode>;
  @Input()
  newNode = false;
  @Input()
  bidEditable = false;

  @Output() $addOrDeleteNode = new EventEmitter<BNode>();

  okay = true;
  normal = true;

  constructor() {
    this.bnode = new BNode("", [], "");
  }

  ngOnInit(): void {
    this.checkCondition();
  }

  selectBid(bn: BNode) {
    this.subject.next(bn);
//    this.selectNode.emit(bn);
  }

  addOdeleteBid(bn: BNode) {
    this.$addOrDeleteNode.next(bn);
  }

  checkCondition() {
    this.okay =  this.checkCond();
  }

  checkCond() {
    let dh = new DealHandCondition();
    let cond = this.bnode.con.split("/")[0];
    if (cond.length === 0) return true;
    try {
      if (dh.parseConditionWorker(cond) === undefined)
        return false;
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
