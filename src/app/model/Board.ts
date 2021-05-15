import {Hand} from "./Hand";
import {LinObject} from "./LinObject";
import {BiddingSequence} from "./BiddingSequence";
import {Deal} from "./Deal";
import {BNodeSequence} from "./BNodeSequence";
import {BNode} from "./BNode";
import {PBNObject} from "./PBNObject";

export class Board {

  southHand: Hand = new Hand();
  westHand: Hand = new Hand();
  northHand: Hand = new Hand();
  eastHand: Hand = new Hand();

  players = [];

  biddingSequence: BiddingSequence = new BiddingSequence();

  intialized = false;

  importLinObject(linobject: LinObject) {
    this.southHand.setHandFromLinString(linobject.south());
    this.westHand.setHandFromLinString(linobject.west());
    this.northHand.setHandFromLinString(linobject.north());
    this.constructEastHand();
    this.reverseCardsInSuits();
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

  constructDealString(separator: string) {
    return "W:" + this.westHand.getHandString() + separator
      + this.northHand.getHandString() + separator
      + this.eastHand.getHandString() + separator
      + this.southHand.getHandString();
  }

  importFromDealString(dealstring: string, separator: string) {
    this.resetHands();
    console.log(dealstring);
    let hands = PBNObject.hands(dealstring);
    let direction = dealstring.substr(0,1);
    let dirNum = direction.getDirectionNo();
    this.westHand.setHandFromPBNString(hands[(4+1-dirNum)%4]);
    this.northHand.setHandFromPBNString(hands[(4+2-dirNum)%4]);
    this.eastHand.setHandFromPBNString(hands[(4+3-dirNum)%4]);
    this.southHand.setHandFromPBNString(hands[(4+0-dirNum)%4]);
  }

  setHands(d: Deal) {
    this.southHand.setHandFromLinString(d.printLinHand(1));
    this.westHand.setHandFromLinString(d.printLinHand(2));
    this.northHand.setHandFromLinString(d.printLinHand(3));
    this.eastHand.setHandFromLinString(d.printLinHand(4));
    // this.reverseCardsInSuits();
    this.intialized = true;
  }

  importCanonicalSequence(bns: BNode[], dealer: string) {
    this.biddingSequence = new BiddingSequence();
    this.biddingSequence.importCanonicalSequence(bns);
    this.biddingSequence.dealer = dealer;
  }

  resetBidding() {
    this.biddingSequence = new BiddingSequence();
  }

  resetHands() {
    this.southHand = new Hand();
    this.westHand = new Hand();
    this.northHand = new Hand();
    this.eastHand = new Hand();
  }

  export(name: string) {
    let dealstring = (this.constructDealString(" "));
    localStorage.setItem(name, dealstring);
    this.importFromDealString(dealstring, " ");
  }

  importFromLocalStorage(name: string) {
    let dealstring = localStorage.getItem(name);
    if (dealstring)
      this.importFromDealString(dealstring, " ");
  }


  importPBNObject() {

  }

  importPBNHands(hands: string[]) {

  }


}
