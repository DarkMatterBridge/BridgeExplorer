import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit, OnChanges {

  @Input()
  bnode!: BNode;
  @Input()
  subject!: Subject<BNode>;

  editable = false;

  linkedNodes: BNode[] = new Array();

  newBnode = new BNode("", [], "", "");

  constructor(private bsm: BridgeSystemManager) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.bnode.linkedNode !== undefined) {
      this.linkedNodes = this.bnode.linkedNode.nodes;
    } else {
      this.linkedNodes = new Array();
    }
  }

  addNode(): void {
    if (this.newBnode.bid.length === 0) {
      return;
    }
    this.bsm.persistNode(this.newBnode);
    this.newBnode.desc = "NEW";
    this.bnode.nodes.push(this.newBnode);
    this.newBnode = new BNode("", [], "", "");
  }

  addOrdeleteNode(bn: BNode): void {
    if (bn.id !== -1) {
      this.bnode.nodes = this.bnode.nodes.filter(b => b !== bn);
    } else {
      this.addNode();
    }
  }

  unlink() {
    this.bnode.linkedNode = undefined;
    this.bnode.linkedId = undefined;
    this.linkedNodes = new Array();
  }

  materialize() {
    this.bsm.materializeLinkeNode(this.bnode);
    this.linkedNodes = new Array();
  }
}
