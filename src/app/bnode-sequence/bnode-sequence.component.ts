import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {BNodeSequence} from '../model/BNodeSequence';
import {BNodeComposite} from '../model/BNodeComposite';

@Component({
  selector: 'app-bnode-sequence',
  templateUrl: './bnode-sequence.component.html',
  styleUrls: ['./bnode-sequence.component.scss']
})
export class BnodeSequenceComponent implements OnInit {

  @Input() subject!: Subject<BNodeComposite>;
  @Output() selectNode = new EventEmitter<BNodeComposite | undefined>();

  @Output() conditions = new EventEmitter<string[]>();
  @Output() bNodeSequenceEventEmitter = new EventEmitter<BNodeSequence>();

  bNodeSequence: BNodeSequence;

  constructor() {
    this.bNodeSequence = new BNodeSequence();
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.addBNode(b));
  }

  addBNode(bnc: BNodeComposite): void {
    if (bnc === undefined) {
      this.reset();
    } else {
      this.bNodeSequence.addNode(bnc);
    }
  }

  selectBid(bnc: BNodeComposite): void {
    this.bNodeSequence.setIndexNode(bnc);
    this.selectNode.emit(bnc);
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
