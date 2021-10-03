import {Injectable} from '@angular/core';
import {BNode} from '../model/BNode';

@Injectable({
  providedIn: 'root'
})
export class BridgeSystemManager {

  constructor() {
  }

  addNode(node: BNode, subNode: BNode): void {
    node.nodes.push(subNode);
  }

  addBid(node: BNode, bid: string, con: string): void {
    const b = new BNode(bid, new Array<BNode>(), con);
    this.addNode(node, b);
    return b;
  }

  getNode(bidList: Map<number, BNode>, id: number): BNode |undefined{
    return bidList.get(id);
  }

  getBidAtCurrentNode(node: BNode, id: number | undefined): BNode {
    const x = node.nodes.find(bid => bid.id === id);
    if (x !== undefined) {
      return x;
    } else {
      throw new Error('given id ' + id + ' undefined');
    }
  }

  determineHighestId(node: BNode): number {
    return node.nodes.length === 0 ? -1 : Math.max(...node.nodes.map(b => Math.max(b.id, this.determineHighestId(b))));
  }

  determineAndSetHighestId(node: BNode): number {
    BNode.highestId = this.determineHighestId(node);
    return BNode.highestId;
  }

  determineLinkedNodes(bidList: Map<number, BNode>): BNode[] {
    return [...bidList].filter(([_, node]) => node.linkedId !== undefined).map(([_, b]) => b);
  }

  connectLinkedNodesW(linkedNodes: BNode[], bidList: Map<number, BNode>): void{
//    alert("linked nodes: "+ linkedNodes.length);
    for (const nwl of linkedNodes) {
      nwl.linkedNode = bidList.get(nwl.linkedId || -1);
      // alert(nwl.linkedId+" "+nwl.linkedNode?.bid);
    }
  }

  makeUsable(bn: BNode): void {
    const bidList = this.getTotalBidList(bn);
    this.connectLinkedNodesW(this.determineLinkedNodes(bidList), bidList);
    this.determineAndSetHighestId(bn);
  }

  determineLinkedNodesDirect(node: BNode): BNode[] {
    const linkedNodes = new Array<BNode>();
    if (node.linkedId !== undefined) {
      linkedNodes.push(node);
    }
    if (node.nodes.length > 0) {
      return linkedNodes.concat(node.nodes.map(b => this.determineLinkedNodesDirect(b)).reduce((accumulator, value) => accumulator.concat(value), []));
    } else {
      return linkedNodes;
    }
  }

  connectLinkedNodesDirect(node: BNode, bidList: Map<number, BNode>): void {
    this.connectLinkedNodesWorker(bidList, this.determineLinkedNodesDirect(node));
  }

  connectLinkedNodesWorker(bidlist: Map<number, BNode>, nodesWithLinks: BNode[]): void {
    for (const nwl of nodesWithLinks) {
      nwl.linkedNode = bidlist.get(nwl.id);
    }
  }

  getTotalBidList(node: BNode): Map<number, BNode> {
    if (node.nodes.length > 0) {
      return node.nodes.map(b => this.getTotalBidList(b)).reduce((accumulator, value) => new Map([...accumulator, ...value]), new Map()).set(node.id, node);
    } else {
      return new Map([[node.id, node]]);
    }
  }

  persistNode(bnode: BNode): void {
    BNode.highestId += 1;
    bnode.id = BNode.highestId;
  }

  materializeLinkeNode(bnode: BNode): void {
    if (bnode.linkedNode) {
      // bnode.nodes = [...bnode.linkedNode.nodes];
      bnode.nodes = this.copyBNode(bnode.linkedNode).nodes;
      bnode.linkedNode = undefined;
      bnode.linkedId = undefined;
    }
  }

  copyBNode(bnode: BNode): BNode{
    return  JSON.parse(this.transformToJson(bnode)) as BNode;
  }

  transformToJson(bnode: BNode): string {
    return JSON.stringify(bnode, ['id', 'bid', 'con', 'desc', 'nodes', 'ob', 'linkedId', 'linkedNode']);
  }


}
