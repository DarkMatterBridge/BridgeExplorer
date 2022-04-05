import {BNode} from './BNode';

export class BNodeComposite {

  bnode: BNode;
  bid: string;
  lastContractBid: string;
  contextualizedCondition: string; // todo
  // handAttributes: HandAttributes = new HandAttributes(); //todo


  constructor(bnode: BNode, bid: string, lastContractBid: string, contextualizedCondition: string) {
    this.bnode = bnode;
    this.bid = bid;
    this.lastContractBid = lastContractBid;
    this.contextualizedCondition = contextualizedCondition;
  }

  newBNC(newBnode: BNode): BNodeComposite {
    let lcb = this.lastContractBid;
    if (isNaN(+newBnode.bid)) {
      if (newBnode.bid.isContractBid()) {
        lcb = newBnode.bid;
      }
      return new BNodeComposite(newBnode, newBnode.bid, lcb, newBnode.con);
    }
    // so newBnode.bid is a number
    const newBid = this.addStepsToBid(this.lastContractBid, +newBnode.bid);
    return new BNodeComposite(newBnode, newBid, newBid, newBnode.con);
  }

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

}
