import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BNode} from '../../model/BNode';
import {Subject} from 'rxjs';
import {BridgeSystemManager} from '../../services/bridge-system-manager.service';
import {BNodeComposite} from '../../model/BNodeComposite';
import {ConditionManager} from '../../services/ConditionManager';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit, OnChanges {

  @Input()
  bnc!: BNodeComposite;
  // bnode!: BNode;
  @Input()
    // subject!: Subject<BNode>;
  subject!: Subject<BNodeComposite>;
  @Input()
  editable = false;

  linkedNodes: BNode[] = [];

  newBnc!: BNodeComposite;

  bncList: BNodeComposite[] = [];
  bncLinkedList: BNodeComposite[] = [];

  constructor(private bsm: BridgeSystemManager,
              private conditionManager: ConditionManager,
              private fileService: FileService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.bnc);
  }

  ngOnChanges(): void {
    if (this.bnc.bnode.linkedNode !== undefined) {
      this.linkedNodes = this.bnc.bnode.linkedNode.nodes;
    } else {
      this.linkedNodes = [];
    }
    // this.newBnc = this.bnc.buildNextBNC(new BNode('', [], ''));
    this.newBnc = this.conditionManager.buildNextBNC(this.bnc, new BNode('', [], ''));
    this.bncList = this.getBncList();
    this.bncLinkedList = this.getLinkedBncList();
  }

  addNode(): void {
    if (this.newBnc.bnode.bid.length === 0) {
      if (this.bncList.length > 0) {
        const highestBid = this.bncList[this.bncList.length - 1];
        this.newBnc.bnode.bid = this.conditionManager.addStepsToBid(highestBid.lastContractBid, 1);
      } else {
        return;
      }
    }
    this.bsm.persistNode(this.newBnc.bnode);
    this.bnc.bnode.nodes.push(this.newBnc.bnode);
    this.sortNodes();
    // this.newBnc = this.bnc.buildNextBNC(new BNode('', [], ''));
    this.newBnc = this.conditionManager.buildNextBNC(this.bnc, new BNode('', [], ''));
  }

  sortNodes(): void {
    this.bnc.bnode.nodes = this.bnc.bnode.nodes
      .sort((a, b) => this.strainOrder(a).localeCompare(this.strainOrder(b)));
  }

  strainOrder(node: BNode): string {
    return (node.ob ? 'b' : 'a') + ((node.bid.endsWith('N')) ? node.bid.substr(0, 1) + 'Z' : node.bid);
  }

  addOrdeleteNode(bn: BNode): void {
    if (bn.id !== -1) {  // delete
      const r = confirm('Really delete this bid?');

      if (r) {
        if (this.bsm.isALinkedNodeInSystem(bn)) {
          this.matSnackBar.open(`Bid ${bn.bid} cannot be deleted since it is used as  linked node`, '', {duration: 3000});
        } else {
          this.matSnackBar.open(`Bid ${bn.bid} was deleted`, '', {duration: 3000});
          this.bnc.bnode.nodes = this.bnc.bnode.nodes.filter(b => b !== bn);
        }
      }

    } else {
      this.addNode(); // add
    }
    this.bncList = this.getBncList();
  }

  unlink(): void {
    this.bnc.bnode.linkedNode = undefined;
    this.bnc.bnode.linkedId = undefined;
    this.linkedNodes = [];
  }

  materialize(): void {
    this.bsm.materializeLinkeNode(this.bnc.bnode);
    this.linkedNodes = [];
  }

  getBncList(): BNodeComposite[] {
    return this.getBncListX(this.bnc);
  }

  getBncListX(bnc: BNodeComposite): BNodeComposite[] {
    return bnc.bnode.nodes.map(
      node => this.conditionManager.buildNextBNC(bnc, node)
    );
  }

  getBncList2Levels(): BNodeComposite[][] {
    const bncList1Level = this.getBncList();
    const d2 = bncList1Level.map(bnc => [bnc].concat(this.getBncListX(bnc)));
    console.log(d2);

    let text = '<html><body> <table>';
    text = text + d2.map(bid => this.addLine(bid)).join('');
    text = text + '</table></body></html>';
    console.log(text);
    this.fileService.showInNewWindow('TABLE', text);

    return d2;
  }

  addLine(bncList: BNodeComposite[]): string {
    let text = '<tr>';
    bncList.forEach(bid => text = text + '<td>' + bid.contextualizedCondition + '</td>');
    text = text + '</tr>';
    return text;
  }

  getLinkedBncList(): BNodeComposite[] {
    if (this.bnc.bnode.linkedNode !== undefined) {
      return this.bnc.bnode.linkedNode.nodes.map(
        // node => this.bnc.buildNextBNC(node)
        node => this.conditionManager.buildNextBNC(this.bnc, node)
      );
    } else {
      return [];
    }
  }

}
