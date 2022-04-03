import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BNode} from '../../model/BNode';
import {Subject} from 'rxjs';
import {BridgeSystemManager} from '../../services/bridge-system-manager.service';
import {BNodeComposite} from '../../model/BNodeComposite';

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

  constructor(private bsm: BridgeSystemManager) {
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
    this.newBnc = this.bnc.newBNC(new BNode('', [], ''));
    this.bncList = this.getBncList();
    this.bncLinkedList = this.getLinkedBncList();
  }

  addNode(): void {
    if (this.newBnc.bnode.bid.length === 0) {
      return;
    }
    this.bsm.persistNode(this.newBnc.bnode);
    this.bnc.bnode.nodes.push(this.newBnc.bnode);
    this.sortNodes();
    this.newBnc = this.bnc.newBNC(new BNode('', [], ''));
  }

  sortNodes(): void {
    this.bnc.bnode.nodes = this.bnc.bnode.nodes
      .sort((a, b) => this.strainOrder(a).localeCompare(this.strainOrder(b)));
  }

  strainOrder(node: BNode): string {
    return (node.ob ? 'b' : 'a') + ((node.bid.endsWith('N')) ? node.bid.substr(0, 1) + 'Z' : node.bid);
  }

  addOrdeleteNode(bn: BNode): void {
    if (bn.id !== -1) {
      this.bnc.bnode.nodes = this.bnc.bnode.nodes.filter(b => b !== bn);
    } else {
      this.addNode();
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
    return this.bnc.bnode.nodes.map(
      node => this.bnc.newBNC(node)
    );
  }

  getLinkedBncList(): BNodeComposite[] {
    if (this.bnc.bnode.linkedNode !== undefined) {
      return this.bnc.bnode.linkedNode.nodes.map(
        node => this.bnc.newBNC(node)
      );
    } else {
      return [];
    }
  }

}
