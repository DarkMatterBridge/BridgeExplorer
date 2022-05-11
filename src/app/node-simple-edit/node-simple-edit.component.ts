import {Component, Input, OnInit} from '@angular/core';
import {BNode} from '../model/BNode';
import {MatDialog} from '@angular/material/dialog';
import {BidSequencesComponent} from '../bid-sequences/bid-sequences.component';
import {BridgeSystemManager} from '../services/bridge-system-manager.service';

@Component({
  selector: 'app-node-simple-edit',
  templateUrl: './node-simple-edit.component.html',
  styleUrls: ['./node-simple-edit.component.scss']
})
export class NodeSimpleEditComponent implements OnInit {

  @Input()
  bnode!: BNode;

  constructor(public dialog: MatDialog, public bsm: BridgeSystemManager) {
  }

  ngOnInit(): void {
  }

  getLinkedNodes(): BNode[] {
    if (this.bsm.bs) {
      const linkedNodes = this.bsm.determineLinkedNodesDirect(this.bsm.bs);
      return linkedNodes.filter((lb) => lb.linkedNode && this.bnode.id === lb.linkedNode.id);
    }
    return new Array<BNode>();
  }

  showLinkedDetails(): void {

    const linkedNodess = this.getLinkedNodes();
    if (this.bsm.bs) {
      const allSequences = this.bsm.getTotalBidSequenceMap(this.bsm.bs);
      const sequenceList = linkedNodess.map( (node) => allSequences.get(node));
      const dialogRef = this.dialog.open(BidSequencesComponent,
        {
          data: {bnode: this.bnode, linkedNodes: linkedNodess, sequences: sequenceList},
        });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }


}
