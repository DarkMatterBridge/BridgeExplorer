import {BNodeSequence} from "./BNodeSequence";
import {last} from "rxjs/operators";
import {BNode} from "./BNode";

export class BiddingSequence {

  bids: string[] = [];

  latestContractBid: string | undefined;
  dealer: string = "W"; // default

  // business logic:

  addBid(bid: string) {
    if (this.isBidLegal(bid)) {
      this.bids.push(bid);

      if (this.isContractBid(bid))
        this.latestContractBid = bid;
    }
  }

  // x is possible if last bid contractBid or contractBid - p - p
  isBidLegal(bid: string): boolean {

    if (this.biddingFinished())
      return false;

    if (bid === 'P')
      return true;
    if (bid === 'X')
      return this.doubleAllowed();
    if (bid === 'XX')
      return this.redoubleAllowed()

    if (this.latestContractBid === undefined)
      return true;

    if (bid === this.latestContractBid)
      return false;

    if (bid.substr(0, 1) > this.latestContractBid?.substr(0, 1))
      return true;

    if (bid.substr(0, 1) < this.latestContractBid?.substr(0, 1))
      return false;

    if (bid.substr(1, 1) === "N")
      return true;

    if (this.latestContractBid.substr(1, 1) === "N")
      return false;

    return bid.substr(1, 1) > this.latestContractBid?.substr(1, 1);


  }

  isContractBid(bid: string) {
    return bid !== 'P' && bid !== 'X' && bid !== 'XX';
  }

  doubleAllowed(): boolean {
    if (this.bids.length === 0)
      return false;
    if (this.isContractBid(this.bids[this.bids.length - 1]))
      return true;
    if (this.bids.length < 3)
      return false;
    return this.isContractBid(this.bids[this.bids.length - 3]) &&
      this.bids[this.bids.length - 2] == 'P' && this.bids[this.bids.length - 1] == 'P';

  }

  redoubleAllowed(): boolean {
    // XX is possible if last bid X or x - p - p
    if (this.bids.length === 0)
      return false;
    if (this.bids[this.bids.length - 1] === 'X')
      return true;
    if (this.bids.length < 3)
      return false;
    return this.bids[this.bids.length - 3] === 'X' &&
      this.bids[this.bids.length - 2] == 'P' && this.bids[this.bids.length - 1] == 'P';

  }

  biddingFinished(): boolean {
    return this.bids.length > 3 && this.bids[this.bids.length - 3] === 'P' &&
      this.bids[this.bids.length - 2] === 'P' && this.bids[this.bids.length - 1] === 'P';
  }

  importBnodeSequence(bNodeSequence: BNodeSequence) {
    // this.bids = bNodeSequence.bids.slice(1);
    this.bids = [];
    alert(bNodeSequence.bids.length+" "+bNodeSequence.nodes.length);
    let passeDefault = false;
    for (let i = 1; i < bNodeSequence.nodes.length; i++) {
      if ((bNodeSequence.nodes)[i].ob != undefined) {
        passeDefault = false;
      } else {
        if (passeDefault) {
          this.bids.push("P");
        }
        passeDefault = true;
      }
      this.bids.push(bNodeSequence.bids[i]);
    }
    console.log("-->" + this.bids);
    this.determineLastContractBid();
  }

  importCanonicalSequence(nodes: BNode[]) {
    this.bids = nodes.map(node => node.bid);
    console.log("-->" + this.bids);
    this.determineLastContractBid();
  }

  determineLastContractBid() {
    let lastBid = this.bids.slice().reverse().find(b => b.isContractBid());
    alert(lastBid);
    if (lastBid)
      this.latestContractBid = lastBid;
  }

}
