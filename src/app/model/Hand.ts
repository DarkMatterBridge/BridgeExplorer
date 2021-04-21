export class Hand {

  cardsNumeric: number[] | undefined;
  cards: string[][];

  static suitDE = ['Treff', 'Karo', 'Herz', 'Pik'];
  static suitEN = ['Club', 'Diamond', 'Heart', 'Spades'];
  static symbols = ['♣', '♦', '♥', '♠'];
  static valueDE = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'B', 'D', 'K', 'A'];
  static valueEN = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  cardsInSuit: number[];

  constructor() {
    this.cards = new Array<Array<string>>();
    this.cardsInSuit = [0, 0, 0, 0];
  }

  setHandFromString(handString: string) { // Assuming currently the Lin Format
    this.setSuitFromString("S", (handString.match(/S(.*)H/) || []) [0].split(/[SH]/)[1]);
    this.setSuitFromString("H", (handString.match(/H(.*)D/) || []) [0].split(/[HD]/)[1]);
    this.setSuitFromString("D", (handString.match(/D(.*)C/) || []) [0].split(/[DC]/)[1]);
    this.setSuitFromString("C", (handString.match(/C(.*)$/) || []) [0].substr(1));
  }

  setSuitFromString(suitEN: string, valuesEN: string) {
    console.log(suitEN + " : " + valuesEN);
    var suitNum = 11 // = undefined
    switch (suitEN) {
      case 'C':
        suitNum = 0;
        break;
      case 'D':
        suitNum = 1;
        break;
      case 'H':
        suitNum = 2;
        break;
      case 'S':
        suitNum = 3;
        break;
    }
    let n = 0;
    this.cards[suitNum] = new Array();
    for (let v of valuesEN.split("")) {
      this.cards[suitNum][n] = v;
      n++;
    }
  }

  pintHand(): string {
    return "";
  }

  reverseSuits() {
    this.cards[0] = this.cards[0].reverse();
    this.cards[1] = this.cards[1].reverse();
    this.cards[2] = this.cards[2].reverse();
    this.cards[3] = this.cards[3].reverse();
  }

  detCardsInSuit() {
    this.cardsInSuit = [0, 0, 0, 0];
    this.cardsInSuit[0] = this.cards[0].length;
    this.cardsInSuit[1] = this.cards[1].length;
    this.cardsInSuit[2] = this.cards[2].length;
    this.cardsInSuit[3] = this.cards[3].length;
  }

  isBalanced(): boolean {
    // 5332 90   4221 16
    // 4333 108  3222 24
    // 4432 96   3321 18
    // 6322 72   5211 10
    // 5422 80   4311 12
    if (this.cardsInSuit == null)
      this.detCardsInSuit();
    return this.cardsInSuit[3] * this.cardsInSuit[2] * this.cardsInSuit[1] * this.cardsInSuit[0] > 89;

  }

  isSemiBalanced(): boolean {
    if (this.cardsInSuit == null)
      this.detCardsInSuit();
    return this.cardsInSuit[3] * this.cardsInSuit[2] * this.cardsInSuit[1] * this.cardsInSuit[0] > 71;
  }

  pointsInSuit(suit: number) {
    this.cards[suit].reduce((a, b) => a + this.points(b), 0);
  }

  points(c: string) : number{
    if (c === 'A')
      return 4;
    if (c === 'K')
      return 3;
    if (c === 'Q')
      return 2;
    if (c === 'J')
      return 1;
    return 0
  }

}
