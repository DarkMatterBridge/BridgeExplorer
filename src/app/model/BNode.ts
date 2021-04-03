import {Bid} from "./Bid";

export class BNode {

  static highestId: number = -1;
  id: number;
  bid: string;
  description: string;
  condition: string;
  nodes: BNode[];

  linkedNode: BNode | undefined;
  linkedId: number | undefined;

  who = true; // we = true / they = false

  constructor(bid: string, nodes: BNode[], description: string, condition: string) {
//    BNode.highestId += 1;
    this.id = -1;
    this.bid = bid;
    this.nodes = nodes;
    this.description = description;
    this.condition = condition;
  }

}
