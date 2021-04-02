import {Component, Input, OnInit} from '@angular/core';
import {BNode} from "../model/BNode";
import {BiddingSystem} from "../model/BiddingSystem";
import {BridgeSystemManager} from "../services/bridge-system-manager.service";

@Component({
  selector: 'app-bid-jar',
  templateUrl: './bid-jar.component.html',
  styleUrls: ['./bid-jar.component.scss']
})
export class BidJarComponent implements OnInit {

  bnode!: BNode;

  bridgeSystem : BiddingSystem;

  constructor(private  bsm: BridgeSystemManager) {
    this.bridgeSystem = new BiddingSystem(this.bsm);
    this.bnode = this.bridgeSystem.bridgeSystem;
  }

  ngOnInit(): void {
  }

}
