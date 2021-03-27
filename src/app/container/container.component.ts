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
    console.log(BNode.id);
    var o = this.biddingSystem.addBid(1, "opening", "", "");
    console.log(BNode.id);
    var opening = this.biddingSystem.getBid(1);
    opening.addBid(2, "1C", "P>15");
    console.log(BNode.id);
    opening.addBid(3, "1D", "P>9, P<17, 2+D");
    console.log(BNode.id);
    o.addBid(4, "1M", "");
    console.log(BNode.id);


    var s = JSON.stringify(this.biddingSystem);
    console.log(s);
    this.biddingSystem = <BNode>JSON.parse(s);
    s = JSON.stringify(this.biddingSystem, ["id", "bid", "condition", "description", "nodes"]);
    console.log(s);
  }

}
