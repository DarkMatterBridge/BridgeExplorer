import {BNode} from './BNode';
import {HandAttributes} from "./HandAttributes";

export class BNodeComposite {

  bnode: BNode;
  bid: string;
  lastContractBid: string;
  contextualizedCondition: string; // todo
  handAttributes: HandAttributes = new HandAttributes();

  constructor(bnode: BNode, bid: string = '', lastContractBid: string = '', contextualizedCondition: string = '',
              handAttributes: HandAttributes = new HandAttributes()) {
    this.bnode = bnode;
    this.bid = bid;
    this.lastContractBid = lastContractBid;
    this.contextualizedCondition = contextualizedCondition;
    this.handAttributes = handAttributes;
  }

  buildNextBNC(newBnode: BNode): BNodeComposite {
    let lcb = this.lastContractBid;
    let newBid = '';
    if (isNaN(+newBnode.bid)) { // so newBnode.bid is a not number
      newBid = newBnode.bid;
      if (newBnode.bid.isContractBid()) {
        lcb = newBnode.bid;
      }
    } else {       // so newBnode.bid is a number
      newBid = this.addStepsToBid(this.lastContractBid, +newBnode.bid);
      lcb = newBid;
    }
    return new BNodeComposite(newBnode, newBid, lcb, newBnode.con, {...this.handAttributes} as HandAttributes);
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
