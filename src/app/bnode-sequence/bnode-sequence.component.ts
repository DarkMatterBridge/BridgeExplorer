import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {BNode} from "../model/BNode";
import {BNodeSequence} from "../model/BNodeSequence";

@Component({
  selector: 'app-bnode-sequence',
  templateUrl: './bnode-sequence.component.html',
  styleUrls: ['./bnode-sequence.component.scss']
})
export class BnodeSequenceComponent implements OnInit {

  @Input() subject!: Subject<BNode>;
  @Output() selectNode = new EventEmitter<BNode|undefined>();

  bns: BNodeSequence;

  constructor() {
    this.bns = new BNodeSequence();
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.addBNode(b));
  }

  addBNode(bnode: BNode) {
    this.bns.addNode(bnode);
  }

  selectBid(bn: BNode) {
    this.bns.setIndexNode(bn);
    this.selectNode.emit(bn);
  }

  reset() {
    this.bns.reset();
    this.selectNode.emit(undefined);
  }

}