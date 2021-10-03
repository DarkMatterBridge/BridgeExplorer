import {BNode} from './BNode';
import './../model/string.extension';

export class BNodeSequence {

  nodes: BNode[] = new Array<BNode>();
  bids = new Array<string>();
  index = -1;
  indexNode: BNode | undefined;
  isRealBiddingSequence = true;
  rbNodes: BNode[] = new Array<BNode>();

  getIndex(bnode: BNode | undefined): number {
    return (bnode === undefined) ? -1 : this.nodes.indexOf(bnode);
  }

  addNode = (bnode: BNode) => {
    this.index = this.getIndex(this.indexNode);
    if (this.index === -1) {
    } else {
      this.cutAt(this.index + 1);
    }
    this.nodes.push(bnode);
    this.handleBidSemantics(bnode);
    this.indexNode = bnode;
  }

  cutAt(i: number): void {
    this.nodes = this.nodes.slice(0, i);
    this.bids = this.bids.slice(0, i);
  }

  setIndexNode(bnode: BNode): void {
    this.indexNode = bnode;
  }

  reset(): void {
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

  handleBidSemantics(newBid: BNode): void {
    let transformedBid = newBid.bid;
    if (this.bids.length > 0) {
      const lastBid = this.bids[this.bids.length - 1];
      transformedBid = this.transformNewBid(lastBid, newBid);
      this.isRealBiddingSequence = this.isRealBiddingSequence && transformedBid.isBid();
    }
    this.bids.push(transformedBid);
  }

  transformNewBid(lastBid: string, newBid: BNode): string {
    if (!lastBid.isContractBid() || isNaN(+newBid.bid)) {
      return newBid.bid;
    }
    return this.addStepsToBid(lastBid, +newBid.bid);
  }

  // TODO: this is bidding rules logic > needs to be put elsewhere later; maybe to String Class?
  addStepsToBid(bid: string, steps: number): string {

    const b = ['C', 'D', 'H', 'S', 'N', 'C', 'D', 'H', 'S', 'N'];
    const index = b.findIndex(x => x === bid.charAt(1));
    if (index >= 0) {
      const newIndex = index + steps;
      const levelUp = Math.floor(newIndex / 5);
      // var num = ~~(a / b);
      // var num = (a / b) >> 0;
      const level = +bid.charAt(0) + levelUp;
      const suitNo = newIndex % 5;
      return level + b[suitNo];
    }
    return bid;
  }

  public buildCanonicalSequence(): Array<BNode> { // todo include all directions & opps

    const e = new Array<BNode>();
    let passeDefault = false;
    for (let i = 1; i < this.nodes.length; i++) {
      if (this.nodes[i].ob !== undefined && this.nodes[i].ob) {
        passeDefault = false;
      } else {
        if (passeDefault) {
          e.push(new BNode('P', new Array<BNode>(), ''));
        }
        passeDefault = true;
      }
      const b = {...this.nodes[i]};
      b.bid = this.bids[i];
      e.push(b);
    }
    this.rbNodes = e;
    console.log('exp');
    console.log(this.rbNodes);
    return e;
  }

  public generateRandomSequenceFromIndex(): void {
    const indexNode = this.indexNode;
    if (indexNode !== undefined) {
      const lll = indexNode;
      const len = lll.nodes?.length;
      if (len !== null && len > 0) {
        const z = Math.floor(Math.random() * (lll.nodes.length));
        this.addNode(indexNode.nodes[z]);
        this.generateRandomSequenceFromIndex();
      }
      this.indexNode = indexNode;
    }
  }
}
