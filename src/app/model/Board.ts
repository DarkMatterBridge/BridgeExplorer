import {Hand} from "./Hand";
import {LinObject} from "./LinObject";
import {BiddingSequence} from "./BiddingSequence";
import {Deal} from "./Deal";
import {BNodeSequence} from "./BNodeSequence";
import {BNode} from "./BNode";

export class Board {

  southHand: Hand = new Hand();
  westHand: Hand = new Hand();
  northHand: Hand = new Hand();
  eastHand: Hand = new Hand();

  players = new Array();
  biddingSequence: BiddingSequence = new BiddingSequence();

  intialized = false;

  importLinObject(linobject: LinObject) {
    this.southHand.setHandFromString(linobject.south());
    this.westHand.setHandFromString(linobject.west());
    this.northHand.setHandFromString(linobject.north());
    this.constructEastHand();
    this.biddingSequence.bids = linobject.bids();
    this.biddingSequence.dealer = linobject.dealer();
    this.players = linobject.players();
    this.intialized = true;
  }

  constructEastHand() {
    let mergedSpades = [...this.southHand.cards[3], ...this.westHand.cards[3], ...this.northHand.cards[3]];
    this.eastHand.cards[3] = this.getAllCards().filter(card => !mergedSpades.includes(card));
    let mergedHearts = [...this.southHand.cards[2], ...this.westHand.cards[2], ...this.northHand.cards[2]];
    this.eastHand.cards[2] = this.getAllCards().filter(card => !mergedHearts.includes(card));
    let mergedDiamonds = [...this.southHand.cards[1], ...this.westHand.cards[1], ...this.northHand.cards[1]];
    this.eastHand.cards[1] = this.getAllCards().filter(card => !mergedDiamonds.includes(card));
    let mergedClubs = [...this.southHand.cards[0], ...this.westHand.cards[0], ...this.northHand.cards[0]];
    this.eastHand.cards[0] = this.getAllCards().filter(card => !mergedClubs.includes(card));
  }

  getAllCards() {
    return ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  }

  reverseCardsInSuits() {
    this.southHand.reverseSuits();
    this.westHand.reverseSuits();
    this.northHand.reverseSuits();
    this.eastHand.reverseSuits();
  }

  constructDealString() {
    return "W:" + this.westHand.getHandString() + "x"
      + this.northHand.getHandString() + "x"
      + this.eastHand.getHandString() + "x"
      + this.southHand.getHandString();
  }

  setHands(d: Deal) {
    this.southHand.setHandFromString(d.printHand(1));
    this.westHand.setHandFromString(d.printHand(2));
    this.northHand.setHandFromString(d.printHand(3));
    this.eastHand.setHandFromString(d.printHand(4));
    this.reverseCardsInSuits();
    this.intialized = true;
  }

  importBnodeSequence(bns: BNodeSequence) {
    this.biddingSequence = new BiddingSequence();
    this.biddingSequence.importBnodeSequence(bns);
  }
  importCanonicalSequence(bns: BNode[]) {
    this.biddingSequence = new BiddingSequence();
    this.biddingSequence.importCanonicalSequence(bns);
  }

  resetBidding() {
    this.biddingSequence = new BiddingSequence();
  }

}
