import {BNode} from "./BNode";

export class BNodeSequence {

  nodes: BNode[] = new Array<BNode>();
  bids = new Array<string>();
  index: number = -1;
  indexNode: BNode | undefined;

  getIndex(bnode: BNode | undefined) {
    return (bnode === undefined) ? -1 : this.nodes.indexOf(bnode);
  }

  addNode(bnode: BNode) {
    this.index = this.getIndex(this.indexNode);
    if (this.index === -1) {
    } else {
      this.cutAt(this.index + 1);
    }
    this.nodes.push(bnode);
    this.handleBidSemantics(bnode);
    this.indexNode = bnode;
  }

  cutAt(i: number) {
    this.nodes = this.nodes.slice(0, i);
    this.bids = this.bids.slice(0, i);
  }

  setIndexNode(bnode: BNode) {
    this.indexNode = bnode;
  }

////////
  getNode(i: number) {
    return this.nodes[i];
  }

  reset() {
    this.nodes = new Array<BNode>();
    this.bids = new Array<string>();
    this.indexNode = undefined;
  }

  getLength(): number {
    return this.nodes.length;
  }

  positionOfBNode(bn: BNode): number {
    return this.nodes.indexOf(bn);
  }

  handleBidSemantics(newBid: BNode) {
    if (this.bids.length == 0) {
      this.bids.push(newBid.bid);
    } else {
      let lastBid = this.bids[this.bids.length - 1];
      this.bids.push(this.transformNewBid(lastBid, newBid));
    }
  }

  transformNewBid(lastBid: string, newBid: BNode) {
    if (isNaN(+newBid.bid)) {
      return newBid.bid;
    }
    return this.addStepsToBid(lastBid, +newBid.bid);
  }

  // TODO: this is bidding rules logic > needs to be put elsewhere later
  addStepsToBid(bid: string, steps: number): string {
    let b = ['C', 'D', 'H', 'S', 'N', 'C', 'D', 'H', 'S', 'N'];
    const index = b.findIndex(x => x == bid.charAt(1));
    if (index >= 0) {
      const newIndex = index + steps;
      const levelUp = Math.floor(newIndex / 5);
      // var num = ~~(a / b);
      // var num = (a / b) >> 0;
      const level = +bid.charAt(0) + levelUp;
      const suitNo = newIndex % 5;
      alert(level + b[suitNo]);
      return level + b[suitNo];
    }
    return bid;
  }


}
