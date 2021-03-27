import {Component, OnInit} from '@angular/core';
import {BiddingSystem} from "../model/BiddingSystem";
import {BNode} from "../model/BNode";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  biddingSystem: BNode | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.biddingSystem = new BNode(0, "root", new Array<BNode>(), "Precision", "");
    console.log(BNode.highestId);
    var o = this.biddingSystem.addBid(1, "opening", "", "");

//    biddingSystemManager.addBid(this.biddingSystem,)
    console.log(BNode.highestId);
    var opening = this.biddingSystem.getBid(1);
    opening.addBid(2, "1C", "P>15");
    console.log(BNode.highestId);
    opening.addBid(3, "1D", "P>9, P<17, 2+D");
    console.log(BNode.highestId);
    o.addBid(4, "1M", "");
    console.log(BNode.highestId);

    BNode.highestId = this.biddingSystem.determineHighestId();

    var s = JSON.stringify(this.biddingSystem);
    console.log(s);
    BNode.highestId = -1;
    this.biddingSystem = <BNode>JSON.parse(s);
    this.biddingSystem = JSON.parse(s) as BNode;
    console.log(this.biddingSystem);
//    this.biddingSystem.addBid(1, "Stayman", "", "");
 //   this.biddingSystem.determineHighestId();
    console.log("highest"+ BNode.highestId);

    s = JSON.stringify(this.biddingSystem, ["id", "bid", "condition", "description", "nodes"]);
    this.biddingSystem = JSON.parse(s) as BNode;
    this.biddingSystem.determineHighestId(); // does  not work since the loaded class hasnt got the methods
    console.log(s);
  }

}
