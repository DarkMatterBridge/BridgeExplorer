import {Bid} from "./Bid";

export class BNode {

  static highestId: number = -1;
  id: number;
  bid: string;
  description: string;
  condition: string;
  nodes: BNode[];

  linkedNodes: BNode[] = new Array<BNode>();
  linkedId: number | undefined;

  constructor(id: number, bid: string, nodes: BNode[], description: string, condition: string) {
    BNode.highestId += 1;
    this.id = BNode.highestId;
    this.bid = bid;
    this.nodes = nodes;
    this.description = description;
    this.condition = condition;
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

  determineHighestId(): number {
    return this.nodes.length == 0 ? -1 : Math.max(...this.nodes.map(b => Math.max(b.id,b.determineHighestId())));
  }

}
