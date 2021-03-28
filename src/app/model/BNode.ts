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

  constructor(bid: string, nodes: BNode[], description: string, condition: string) {
    BNode.highestId += 1;
    this.id = BNode.highestId;
    this.bid = bid;
    this.nodes = nodes;
    this.description = description;
    this.condition = condition;
  }

}
