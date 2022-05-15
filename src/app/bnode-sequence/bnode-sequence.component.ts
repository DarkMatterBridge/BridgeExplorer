import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BNodeSequence} from '../model/BNodeSequence';
import {BNodeComposite} from '../model/BNodeComposite';
import {ConditionManager} from '../services/ConditionManager';

@Component({
  selector: 'app-bnode-sequence',
  templateUrl: './bnode-sequence.component.html',
  styleUrls: ['./bnode-sequence.component.scss']
})
export class BnodeSequenceComponent implements OnInit {

  // @Input() subject!: Subject<BNodeComposite>;
  @Output() selectNode = new EventEmitter<BNodeComposite | undefined>();

  // @Output() conditions = new EventEmitter<string[]>();
  @Output() bNodeSequenceEventEmitter = new EventEmitter<BNodeSequence>();

  @Input() bNodeSequence: BNodeSequence;

  constructor(private conditionManager: ConditionManager) {
    this.bNodeSequence = new BNodeSequence();
  }

  ngOnInit(): void {
    // this.subject.asObservable().subscribe(b => this.addBNode(b));
  }

  addBNode(bnc: BNodeComposite): void {  // unused
    if (bnc === undefined) {
      this.reset();
    } else {
      this.bNodeSequence.addNode(bnc);
    }
  }

  selectBid(bnc: BNodeComposite): void {
    console.log(bnc);
    console.log(this.bNodeSequence);
    this.bNodeSequence.setIndexNode(bnc);
    this.selectNode.emit(bnc);
  }

  reset(): void {
    this.bNodeSequence.reset();
    this.selectNode.emit(undefined);
  }

  emitSequence(): void {
    this.rebuildBncSequence();  // needed in case of changes in e.g. conditions
    this.bNodeSequence.buildCanonicalSequence();
    this.bNodeSequenceEventEmitter.emit(this.bNodeSequence);
  }

  generateRandomSequenceFromIndex(): void {
    this.bNodeSequence.generateRandomSequenceFromIndex(this.conditionManager);
  }

  rebuildBncSequence(): void {
    this.bNodeSequence.rebuild(this.conditionManager);

  }

}
