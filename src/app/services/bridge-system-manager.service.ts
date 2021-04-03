import {Injectable} from '@angular/core';
import {BNode} from "../model/BNode";

@Injectable({
  providedIn: 'root'
})
export class BridgeSystemManager {

  constructor() {
  }

  addNode(node: BNode, subNode: BNode) {
    node.nodes.push(subNode);
  }

  addBid(node: BNode, bid: string, condition: string, description: string = "") {
    let b = new BNode(bid, new Array<BNode>(), description, condition);
    this.addNode(node, b);
    return b;
  }

  getNode(bidList: Map<number, BNode>, id: number) {
    return bidList.get(id);
  }

  getBidAtCurrentNode(node: BNode, id: number | undefined) {
    const x = node.nodes.find(bid => bid.id == id);
    if (x != undefined) {
      return x;
    } else {
      throw new Error("given id " + id + " undefined");
    }
  }

  determineHighestId(node: BNode): number {
    return node.nodes.length == 0 ? -1 : Math.max(...node.nodes.map(b => Math.max(b.id, this.determineHighestId(b))));
  }

  determineAndSetHighestId(node: BNode): number {
    BNode.highestId = this.determineHighestId(node);
    return BNode.highestId;
  }

  determineLinkedNodes(bidList: Map<number, BNode>): BNode[] {
    return [...bidList].filter(([id , node]) => node.linkedId != undefined).map(([a, b]) => b);
  }

  connectLinkedNodes(linkedNodes: BNode[], bidList: Map<number, BNode>) {
    for (let nwl of linkedNodes) {
      nwl.linkedNode = bidList.get(nwl.id);
    }
  }

  determineLinkedNodesDirect(node: BNode): BNode[] {
    const linkedNodes = new Array<BNode>();
    if (node.linkedId != undefined) {
      linkedNodes.push(node);
    }
    if (node.nodes.length > 0) {
      return linkedNodes.concat(node.nodes.map(b => this.determineLinkedNodesDirect(b)).reduce((accumulator, value) => accumulator.concat(value), []));
    } else
      return linkedNodes;
  }

  connectLinkedNodesDirect(node: BNode, bidList: Map<number, BNode>) {
    this.connectLinkedNodesWorker(bidList, this.determineLinkedNodesDirect(node));
  }

  connectLinkedNodesWorker(bidlist: Map<number, BNode>, nodesWithLinks: BNode[]) {
    for (let nwl of nodesWithLinks) {
      nwl.linkedNode = bidlist.get(nwl.id);
    }
  }

  getTotalBidList(node: BNode): Map<number, BNode> {
    if (node.nodes.length > 0) {
      return node.nodes.map(b => this.getTotalBidList(b)).reduce((accumulator, value) => new Map([...accumulator, ...value]), new Map()).set(node.id, node);
    } else {
      const map = new Map();
      map.set(node.id, node);
      return map;
    }
  }

  persistNode(bnode : BNode) {
    BNode.highestId += 1;
    bnode.id = BNode.highestId;
  }


}
