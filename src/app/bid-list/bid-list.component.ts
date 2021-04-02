import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {Subject} from "rxjs";

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
  constructor() {
  }

  ngOnInit(): void {
  }

  addNode(): void {
    this.bnode.nodes.push(this.newBnode);
    this.newBnode = new BNode("",[],"","");
  }

  deleteNode(bn: BNode): void {
    this.bnode.nodes = this.bnode.nodes.filter(b => b!==bn);
  }

}
