import {Component, Input, OnInit, Output} from '@angular/core';
import {BNode} from '../model/BNode';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-bid-line',
  templateUrl: './bid-line.component.html',
  styleUrls: ['./bid-line.component.scss']
})
export class BidLineComponent implements OnInit {

  @Input()
  bnode!: BNode ;
  @Input()
  subject!: Subject<BNode>;
  @Input()
  newNode = false ;
  @Input()
  bidEditable = false ;

  @Output() $deleteNode = new EventEmitter<BNode>();

  constructor() {
    this.bnode = new BNode('', [], '');
  }

  ngOnInit(): void {
  }

  selectBid(bn: BNode) {
    this.subject.next(bn);
//    this.selectNode.emit(bn);
  }
  deleteBid(bn: BNode) {
    this.$deleteNode.next(bn);
  }

}
