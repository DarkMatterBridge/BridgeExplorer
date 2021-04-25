import {Board} from "./Board";
import {DealHand} from "./DealHand";

export class Deal {

  cards: number[];
  cardsInSuit: number[][];
  suit = ['Treff', 'Karo', 'Herz', 'Pik'];
  value = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  static suits = ['C', 'D', 'H', 'S'];

  constructor() {
    this.cardsInSuit = new Array();
    this.cards = new Array(52);
    for (var i = 0; i < this.cards.length; i++) {
      this.cards[i] = i;
    }
  }

  card(c: number) {
    let n = c % 13;
    let suit: number = Math.floor(c / 13);
    return this.suit[suit] + this.value[n];
  }

  cardValue(c: number) {
    let n = c % 13;
    return this.value[n];
  }

  shuffle() {
    for (var i = 0; i < this.cards.length; i++) {
      var z = Math.floor(Math.random() * (this.cards.length - i) + i);
      let cardS = this.cards[z];
      this.cards[z] = this.cards[i];
      this.cards[i] = cardS;
      // this.cards[z], this.cards[i] = this.cards[i], this.cards[z];
    }
  }

  getBoard(): Board {
    const board = new Board();
    board.southHand.setHandFromString(this.printHand(1));
    board.westHand.setHandFromString(this.printHand(2));
    board.northHand.setHandFromString(this.printHand(3));
    board.eastHand.setHandFromString(this.printHand(4));
    board.reverseCardsInSuits();
    return board;
  }

  // distribute() {
  //   for (var direction = 0; direction <4; direction++)
  //     for( var i= 0; i< 13; i++) {
  //       this.cardsDirection[direction][i] = this.cards[i+13*direction];
  //       this.hands[direction].cards[i] =  this.cards[i+13*direction];
  //     }
  // }
  //
  // sortHands() {
  //   for (var direction = 0; direction <4; direction++) {
  //     this.cardsDirection[direction].sort((i,j) => (j-i));
  //     this.hands[direction].sort();
  //   }
  // }

  getSortedHand(d: number): number[] {
    return this.cards.slice(d * 13 - 13, d * 13).sort((i, j) => (j - i));
  }

  getHand(d: number): number[] {
    return this.cards.slice(d * 13 - 13, d * 13);
  }

  getDealHand(d: number): DealHand {
    return new DealHand(this.cards.slice(d * 13 - 13, d * 13));
  }

  printHand(d: number) {
    let cards = this.getSortedHand(d);
    let suit = 3;
    let out = "";
    let j = 0;
    for (suit = 3; suit >= 0; suit--) {
      out = out + Deal.suits[suit];
      while (cards[j] >= suit * 13) {
        out = out + this.cardValue(cards[j]);
        j++;
      }
    }
    return out;
  }

  points(d: number): number { // 1 = south, 2= west, 3= north, 4= east
    return this.cards.slice(d * 13 - 13, d * 13).reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 8, 0), 0);
  }

  detCardsInSuit(d: number) {
    if (this.cardsInSuit[d - 1].length === 0)
      this.cardsInSuit[d - 1] = [0, 0, 0, 0];
    this.cards.slice(d * 13 - 13, d * 13).forEach(n => {
      this.cardsInSuit[d-1][Math.floor(n / 13)]++;
    });
  }

  isBalanced(d: number): boolean {
    // 5332 90   4221 16
    // 4333 108  3222 24
    // 4432 96   3321 18
    // 6322 72   5211 10
    // 5422 80   4311 12
    this.detCardsInSuit(d);
    return this.cardsInSuit[d - 1][3] * this.cardsInSuit[d - 1][2] * this.cardsInSuit[d - 1][1] * this.cardsInSuit[d - 1][0] > 89;
  }


}
