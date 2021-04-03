import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {

  @Input()
  bnode!: BNode;
  @Input()
  subject!: Subject<BNode>;

  newBnode = new BNode("",[],"","");
  constructor(private bsm: BridgeSystemManager) {
  }

  ngOnInit(): void {
  }

  addNode(): void {
    if (this.newBnode.bid.length===0) {
      return;
    }
    this.bsm.persistNode(this.newBnode);
    this.bnode.nodes.push(this.newBnode);
    this.newBnode = new BNode("",[],"","");
  }

  deleteNode(bn: BNode): void {
    this.bnode.nodes = this.bnode.nodes.filter(b => b!==bn);
  }


}
