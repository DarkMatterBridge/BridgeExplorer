import {Bid} from "./Bid";

export class BNode {

  static id: number = 0;
  id: number;
  bid: string;
  description: string;
  condition: string;
  nodes: BNode[];

  linkedNodes: BNode[] = new Array<BNode>();
  linkedId: number | undefined;

  constructor(id: number, bid: string, nodes: BNode[], description: string, condition: string) {
    this.id = id;
    this.id = BNode.id;
    this.bid = bid;
    this.nodes = nodes;
    this.description = description;
    this.condition = condition;
    BNode.id += 1;
  }

  addNode(node: BNode) {
    this.nodes.push(node);
  }

  addBid(id: number, bid: string, condition: string, description: string = "") {
    let b = new BNode(id, bid, new Array<BNode>(), description, condition);
    this.nodes.push(b);
    return b;
  }

  getBid(id: number) {
//   return this.nodes.find(bid => bid.id == id) || new BNode(-1,"", new Array<BNode>(),"","")
    var  x = this.nodes.find(bid => bid.id == id)
    if (x != undefined) {
      return x;
    } else {
      throw new Error("given id "+id+" undefined");
    }

  }
}
