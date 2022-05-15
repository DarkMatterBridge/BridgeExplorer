import {BNode} from './BNode';
import './../model/string.extension';
import {BNodeComposite} from './BNodeComposite';
import {ConditionManager} from '../services/ConditionManager';
import {BiddingSequence} from './BiddingSequence';
import {BridgeSystemManager} from '../services/bridge-system-manager.service';
import {HandAttributes} from './HandAttributes';

export class BNodeSequence {  // TODO better BNCSequence?

  index = -1;
  indexNode: BNodeComposite | undefined;
  isRealBiddingSequence = true;
  rbNodes: BNode[] = new Array<BNode>(); // real bnodes  todo -> to be replaced

  compositeNodes: BNodeComposite[] = new Array<BNodeComposite>();

  getIndex(bnc: BNodeComposite | undefined): number {
    return (bnc === undefined) ? -1 : this.compositeNodes.indexOf(bnc);
  }

  addNode = (bnc: BNodeComposite) => {
    this.index = this.getIndex(this.indexNode);
    if (this.index === -1) {
    } else {
      this.cutAt(this.index + 1);
    }
    this.compositeNodes.push(bnc);
    this.indexNode = bnc;
  }

  cutAt(i: number): void {
    this.compositeNodes = this.compositeNodes.slice(0, i);
  }

  setIndexNode(bnc: BNodeComposite): void {
    this.indexNode = bnc;
  }

  reset(): void {
    this.compositeNodes = new Array<BNodeComposite>();
    this.indexNode = undefined;
  }

  getLength(): number {
    return this.compositeNodes.length;
  }

  positionOfBNode(bnc: BNodeComposite): number {
    return this.compositeNodes.indexOf(bnc);
  }

  // TODO: this is bidding rules logic > needs to be put elsewhere later; maybe to String Class?
  // addStepsToBid(bid: string, steps: number): string {
  //
  //   const b = ['C', 'D', 'H', 'S', 'N', 'C', 'D', 'H', 'S', 'N'];
  //   const index = b.findIndex(x => x === bid.charAt(1));
  //   if (index >= 0) {
  //     const newIndex = index + steps;
  //     const levelUp = Math.floor(newIndex / 5);
  //     // var num = ~~(a / b);
  //     // var num = (a / b) >> 0;
  //     const level = +bid.charAt(0) + levelUp;
  //     const suitNo = newIndex % 5;
  //     return level + b[suitNo];
  //   }
  //   return bid;
  // }

  public buildCanonicalSequence(): Array<BNode> { // todo include all directions & opps

    const e = new Array<BNode>();
    let passeDefault = false;
    for (let i = 1; i < this.compositeNodes.length; i++) {
      if (this.compositeNodes[i].bnode.ob !== undefined && this.compositeNodes[i].bnode.ob) {
        passeDefault = false;
      } else {
        if (passeDefault) {
          e.push(new BNode('P', new Array<BNode>(), ''));
        }
        passeDefault = true;
      }
      const b = {...this.compositeNodes[i].bnode};
      b.bid = this.compositeNodes[i].bid; // todo : check if this is right
      b.con = this.compositeNodes[i].contextualizedCondition;
      e.push(b);
    }
    this.rbNodes = e;
    console.log('exp');
    console.log(this.rbNodes);
    return e;
  }

  public generateRandomSequenceFromIndex(conditionManager: ConditionManager): void {
    const indexNode = this.indexNode;
    if (indexNode !== undefined) {
      const len = indexNode.bnode.nodes?.length;
      if (len !== null && len > 0) {
        const z = Math.floor(Math.random() * len);
        this.addNode(conditionManager.buildNextBNC(indexNode, indexNode.bnode.nodes[z]));
        this.generateRandomSequenceFromIndex(conditionManager);
      }
      this.indexNode = indexNode;
    }
  }

  public rebuild(conditionManager: ConditionManager): void {
    for (let i = 1; i < this.compositeNodes.length; i++) {
      this.compositeNodes[i] = conditionManager.buildNextBNC(this.compositeNodes[i - 1], this.compositeNodes[i].bnode);
    }
  }

  public importBiddingSequence(bsm: BridgeSystemManager,
                               biddingSequence: BiddingSequence,
                               conditionManager: ConditionManager): BNodeComposite {

    console.log(biddingSequence.bids);
    const bids = biddingSequence.bids;
    const rootNode = bsm.bs;
    if (rootNode === undefined) {
      throw new Error('Bridgesystem not set');
    }
    this.compositeNodes = new Array<BNodeComposite>();
    const rootBNC = (new BNodeComposite(rootNode));
    // this.addNode(rootBNC);

    const opening = rootNode?.nodes.find(node => node.bid === 'opening');
    console.log(rootNode?.nodes);
    if (opening === undefined) {
      throw new Error('opening not set');
    }
    let bnc = conditionManager.buildNextBNC(rootBNC, opening);
    this.addNode(bnc);

    let bidNode: BNode | undefined;
    for (let i = 0; i < bids.length; i++) {
      if (i % 2 === 0) {
        bidNode = bnc.bnode?.nodes.find(node => node.bid === bids[i]);
        if (bidNode === undefined) {
          const r = confirm('Bid ' + bids[i] + ' does not exist. Add it to system?');
          if (r) {
            bidNode = new BNode(bids[i], new Array<BNode>(), '');
            bnc.bnode.nodes.push(bidNode);
          } else {
            break;
          }
        }
        bnc = conditionManager.buildNextBNC(bnc, bidNode);
        this.addNode(bnc);
      } else {
        // todo handle opps bid
      }
    }

    // const firstBid = opening?.nodes.find(node => node.bid === bids[0]);
    // if (firstBid === undefined) {
    //   throw new Error('First Bid not found');
    // }
    // const firstBidBNC = conditionManager.buildNextBNC(bnc, firstBid);
    // this.addNode(firstBidBNC);
    //
    return bnc;
  }

}
