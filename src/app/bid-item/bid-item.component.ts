import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNode} from '../model/BNode';
import {Subject} from 'rxjs';
import {DealHandCondition} from '../model/DealHandCondition';
import {BNodeComposite} from '../model/BNodeComposite';

@Component({
  selector: '[app-bid-item]',
  templateUrl: './bid-item.component.html',
  styleUrls: ['./bid-item.component.scss']
})
export class BidItemComponent implements OnInit {

  @Input()
  bnc!: BNodeComposite;
  // bnode!: BNode;
  @Input()
  subject!: Subject<BNodeComposite>;
  // subject!: Subject<BNode>;
  @Input()
  newNode = false;
  @Input()
  bidEditable = false;

  @Output() $addOrDeleteNode = new EventEmitter<BNode>();

  okay = true;
  normal = true;

  constructor() {
    this.bnc = new BNodeComposite(new BNode('', [], ''), '', '');
    // this.bnode = new BNode('', [], '');
  }

  ngOnInit(): void {
    this.checkCondition();
  }

  selectBid(bnc: BNodeComposite): void {
    this.subject.next(bnc);
//    this.selectNode.emit(bn);
  }

  addOdeleteBid(bn: BNode): void {
    this.$addOrDeleteNode.next(bn);
  }

  checkCondition(): void {
    this.okay = this.checkCond();
  }

  checkCond(): boolean {
    const dh = new DealHandCondition();
    const cond = this.bnc.bnode.con.split('/')[0];
    if (cond.length === 0) {
      return true;
    }
    try {
      return dh.parseConditionWorker(cond) !== undefined;
    } catch (e: any) {
      return false;
    }
  }
}
