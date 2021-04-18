import {Bid} from "./Bid";

export class BNode {

  static highestId: number = -1;
  id: number;
  bid: string;
  desc: string|undefined;
  con: string;  // the condition
  nodes: BNode[];

  linkedNode: BNode | undefined;
  linkedId: number | undefined;

  who = true; // we = true / they = false
  ob: boolean | undefined;  // oppenents bidding : true  or undefined

  constructor(bid: string, nodes: BNode[], desc: string, con: string) {
//    BNode.highestId += 1;
    this.id = -1;
    this.bid = bid;
    this.nodes = nodes;
//    this.desc = desc;
    this.con = con;
  }

}
