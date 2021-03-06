import {Component, OnInit} from '@angular/core';
import {BNode} from '../model/BNode';
import {BridgeSystemManager} from '../services/bridge-system-manager.service';
import {Deal} from '../model/Deal';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  biddingSystem: BNode | undefined;

  constructor(private bsm: BridgeSystemManager) {
  }

  ngOnInit(): void {
    this.biddingSystem = new BNode('root', new Array<BNode>(), 'Precision');
    console.log(BNode.highestId);
    const opening = this.bsm.addBid(this.biddingSystem, 'opening', '');
    console.log(BNode.highestId);

    this.bsm.addBid(opening, '1C', 'P>15');
    console.log(BNode.highestId);
    this.bsm.addBid(opening, '1D', 'P>9, P<17, 2+D');
    console.log(BNode.highestId);
    const b1M = this.bsm.addBid(opening, '1M', '');
    b1M.linkedId = 2;
    const bidlist = this.bsm.getTotalBidList(this.biddingSystem);
    console.log('bidlist');
    console.log('bidlist');
    console.log(bidlist);

    let x = this.bsm.determineLinkedNodesDirect(this.biddingSystem);
    console.log('linkednodes direct');
    console.log(x);

    x = this.bsm.determineLinkedNodes(bidlist);
    console.log('linkednodes');
    console.log(x);

    this.bsm.determineAndSetHighestId(this.biddingSystem);
    console.log(BNode.highestId);

    let s = JSON.stringify(this.biddingSystem, ['id', 'bid', 'con', 'desc', 'nodes']);
    BNode.highestId = -1;
    this.biddingSystem = (JSON.parse(s) as BNode);
    this.biddingSystem = JSON.parse(s) as BNode;

    this.bsm.determineAndSetHighestId(this.biddingSystem);
    console.log('highest' + BNode.highestId);
    this.bsm.addBid(this.biddingSystem, 'Stayman', '');
    this.bsm.determineAndSetHighestId(this.biddingSystem);
    console.log('highest' + BNode.highestId);

    s = JSON.stringify(this.biddingSystem, ['id', 'bid', 'con', 'desc', 'nodes']);
    this.biddingSystem = JSON.parse(s) as BNode;
    console.log(s);

    const deal = new Deal();
    deal.shuffle();
  }

}
