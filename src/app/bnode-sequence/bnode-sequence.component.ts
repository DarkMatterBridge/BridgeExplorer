import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {BNode} from '../model/BNode';
import {BNodeSequence} from '../model/BNodeSequence';

@Component({
  selector: 'app-bnode-sequence',
  templateUrl: './bnode-sequence.component.html',
  styleUrls: ['./bnode-sequence.component.scss']
})
export class BnodeSequenceComponent implements OnInit {

  @Input() subject!: Subject<BNode>;
  @Output() selectNode = new EventEmitter<BNode | undefined>();

  @Output() conditions = new EventEmitter<string[]>();
  @Output() bNodeSequenceEventEmitter = new EventEmitter<BNodeSequence>();

  bNodeSequence: BNodeSequence;

  constructor() {
    this.bNodeSequence = new BNodeSequence();
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.addBNode(b));
  }

  addBNode(bnode: BNode): void {
    if (bnode === undefined) {
      this.reset();
    } else {
      this.bNodeSequence.addNode(bnode);
    }
  }

  selectBid(bn: BNode): void {
    this.bNodeSequence.setIndexNode(bn);
    this.selectNode.emit(bn);
  }

  reset(): void {
    this.bNodeSequence.reset();
    this.selectNode.emit(undefined);
  }

  emitSequence(): void {
    this.bNodeSequence.buildCanonicalSequence();
    this.bNodeSequenceEventEmitter.emit(this.bNodeSequence);
  }

  generateRandomSequenceFromIndex(): void {
    this.bNodeSequence.generateRandomSequenceFromIndex();
  }

}
