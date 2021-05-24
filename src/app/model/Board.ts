import {Hand} from './Hand';
import {LinObject} from './LinObject';
import {BiddingSequence} from './BiddingSequence';
import {Deal} from './Deal';
import {BNode} from './BNode';
import {PBNObject} from './PBNObject';

export class Board {

  southHand: Hand = new Hand();
  westHand: Hand = new Hand();
  northHand: Hand = new Hand();
  eastHand: Hand = new Hand();

  players: string[] = [];

  biddingSequence: BiddingSequence = new BiddingSequence();

  intialized = false;

  importLinObject(linobject: LinObject): void {
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

  constructEastHand(): void {
    const mergedSpades = [...this.southHand.cards[3], ...this.westHand.cards[3], ...this.northHand.cards[3]];
    this.eastHand.cards[3] = this.getAllCards().filter(card => !mergedSpades.includes(card));
    const mergedHearts = [...this.southHand.cards[2], ...this.westHand.cards[2], ...this.northHand.cards[2]];
    this.eastHand.cards[2] = this.getAllCards().filter(card => !mergedHearts.includes(card));
    const mergedDiamonds = [...this.southHand.cards[1], ...this.westHand.cards[1], ...this.northHand.cards[1]];
    this.eastHand.cards[1] = this.getAllCards().filter(card => !mergedDiamonds.includes(card));
    const mergedClubs = [...this.southHand.cards[0], ...this.westHand.cards[0], ...this.northHand.cards[0]];
    this.eastHand.cards[0] = this.getAllCards().filter(card => !mergedClubs.includes(card));
  }

  getAllCards(): string[] {
    return ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  }

  reverseCardsInSuits(): void {
    this.southHand.reverseSuits();
    this.westHand.reverseSuits();
    this.northHand.reverseSuits();
    this.eastHand.reverseSuits();
  }

  constructDealString(separator: string): string {
    return 'W:' + this.westHand.getHandString() + separator
      + this.northHand.getHandString() + separator
      + this.eastHand.getHandString() + separator
      + this.southHand.getHandString();
  }

  constructBcaclString(): string {
    return this.northHand.getHandString() + '\n'
      + this.eastHand.getHandString() + '\n'
      + this.southHand.getHandString() + '\n' + 'A' + '\n';
  }

  importFromDealString(dealstring: string, separator: string): void {
    this.resetHands();
    console.log(dealstring);
    const hands = PBNObject.hands(dealstring);
    const direction = dealstring.substr(0, 1);
    const dirNum = direction.getDirectionNo();
    this.westHand.setHandFromPBNString(hands[(4 + 1 - dirNum) % 4]);
    this.northHand.setHandFromPBNString(hands[(4 + 2 - dirNum) % 4]);
    this.eastHand.setHandFromPBNString(hands[(4 + 3 - dirNum) % 4]);
    this.southHand.setHandFromPBNString(hands[(4 + 0 - dirNum) % 4]);
  }

  setHands(d: Deal): void {
    this.southHand.setHandFromLinString(d.printLinHand(1));
    this.westHand.setHandFromLinString(d.printLinHand(2));
    this.northHand.setHandFromLinString(d.printLinHand(3));
    this.eastHand.setHandFromLinString(d.printLinHand(4));
    // this.reverseCardsInSuits();
    this.intialized = true;
  }

  importCanonicalSequence(bns: BNode[], dealer: string): void {
    this.biddingSequence = new BiddingSequence();
    this.biddingSequence.importCanonicalSequence(bns);
    this.biddingSequence.dealer = dealer;
  }

  resetBidding(): void {
    this.biddingSequence = new BiddingSequence();
  }

  resetHands(): void {
    this.southHand = new Hand();
    this.westHand = new Hand();
    this.northHand = new Hand();
    this.eastHand = new Hand();
  }

  export(name: string): void {
    const dealstring = (this.constructDealString(' '));
    localStorage.setItem(name, dealstring);
    this.importFromDealString(dealstring, ' ');
  }

  importFromLocalStorage(name: string): void {
    const dealstring = localStorage.getItem(name);
    if (dealstring) {
      this.importFromDealString(dealstring, ' ');
    }
  }


  importPBNObject(): void {

  }

  importPBNHands(hands: string[]): void {

  }


}

// &7C > |
// , > ,
//
//                                                            pn|desert,Chricker,pfreche,cg64|st||md|3S368AHTJKAD35C37A,S459TJH2349D9C8TK,S7QKH7D248TQKAC45,|rh||ah|Board 5|sv|n|mb|1C|an|16+|mb|p|mb|2H|an|14+ BAL|mb|p|mb|3D|mb|p|mb|3H|an|4er LÃ¤nge kein !D Fit|mb|p|mb|4D|an|SI, Turbo|mb|p|mb|4S|an|ungerade Anzahl KC, Pik Cue|mb|p|mb|5D|mb|p|mb|5H|an|Coeur 2t Rundenkontrolle 3 KC|mb|p|mb|7D|mb|p|mb|p|mb|p|pg||pc|D6|pc|D3|pc|D9|pc|DT|pg||mc|13|
// https://www.bridgebase.com/tools/handviewer.html?bbo=y&lin=pn|desert,Chricker,pfreche,cg64|st||md|3S368AHTJKAD35C37A,S459TJH2349D9C8TK,S7QKH7D248TQKAC45,|rh||ah|Board%205|sv|n|mb|1C|an|16%2B|mb|p|mb|2H|an|14%2B%20BAL|mb|p|mb|3D|mb|p|mb|3H|an|4er%20L%C3%83%C2%A4nge%20kein%20%21D%20Fit|mb|p|mb|4D|an|SI,%20Turbo|mb|p|mb|4S|an|ungerade%20Anzahl%20KC,%20Pik%20Cue|mb|p|mb|5D|mb|p|mb|5H|an|Coeur%202t%20Rundenkontrolle%203%20KC|mb|p|mb|7D|mb|p|mb|p|mb|p|pc|D6|pc|D3|pc|D9|pc|DT|mc|13|
