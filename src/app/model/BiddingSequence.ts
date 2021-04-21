export class BiddingSequence {

  bids: string[] = new Array();

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

    if (bid.substr(1, 1) > this.latestContractBid?.substr(1, 1)) // S,H,D,C lexical order!
      return true;

    return false;
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
    if (this.isContractBid(this.bids[this.bids.length - 3]) &&
      this.bids[this.bids.length - 2] == 'P' && this.bids[this.bids.length - 1] == 'P')
      return true;
    return false;
  }

  redoubleAllowed(): boolean {
    // XX is possible if last bid X or x - p - p
    if (this.bids.length === 0)
      return false;
    if (this.bids[this.bids.length - 1] === 'X')
      return true;
    if (this.bids.length < 3)
      return false;
    if (this.bids[this.bids.length - 3] === 'X' &&
      this.bids[this.bids.length - 2] == 'P' && this.bids[this.bids.length - 1] == 'P')
      return true;
    return false;
  }

  biddingFinished(): boolean {
    return this.bids.length > 3 && this.bids[this.bids.length - 3] === 'P' &&
      this.bids[this.bids.length - 2] === 'P' && this.bids[this.bids.length - 1] === 'P';
  }
}
