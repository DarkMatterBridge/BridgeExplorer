import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {BiddingSystem} from "../model/BiddingSystem";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-bid-jar',
  templateUrl: './bid-jar.component.html',
  styleUrls: ['./bid-jar.component.scss']
})
export class BidJarComponent implements OnInit {

  bnode!: BNode;
  baseNode!: BNode;

  subject: Subject<BNode> = new Subject<BNode>();
  bridgeSystem: BiddingSystem;

  constructor(private  bsm: BridgeSystemManager) {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.bnode = this.bridgeSystem.bridgeSystem;
    this.baseNode = this.bnode;
  }

  ngOnInit(): void {
    this.subject.asObservable().subscribe(b => this.setBnode(b));
  }

  setBnode(bn: BNode | undefined) {
    if (bn === undefined) {
      this.bnode = this.baseNode;
    } else {
      this.bnode = bn;
    }
  }

}
