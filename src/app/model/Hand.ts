  export class Hand {

  cardsNumeric: number[] | undefined;
  cards: string[][];

  static suitDE = ['Treff', 'Karo', 'Herz', 'Pik'];
  static suitEN = ['Club', 'Diamond', 'Heart', 'Spades'];
  static symbols = ['♣', '♦', '♥', '♠'];
  static valueDE = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'B', 'D', 'K', 'A'];
  static valueEN = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

//  cardsInSuit: number[];

  constructor() {
    this.cards = new Array<Array<string>>();
  }

  setHandFromString(handString: string) { // Assuming currently only Lin Format
    this.setSuitFromString("S", (handString.match(/S(.*?)H/) ||[]) [0].split(/[SH]/)[1]);
    this.setSuitFromString("H", (handString.match(/H(.*?)D/) ||[]) [0].split(/[HD]/)[1]);
    this.setSuitFromString("D", (handString.match(/D(.*?)C/) ||[]) [0].split(/[DC]/)[1]);
    this.setSuitFromString("C", (handString.match(/C(.*?)$/) ||[]) [0].substr(1));
  }

  setSuitFromString(suitEN: string, valuesEN: string) {
    console.log(suitEN+ " : " + valuesEN);
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
      console.log(suitEN+"."+suitNum+" "+v);
      this.cards[suitNum][n] = v;
      n++;
    }
  }

  pintHand(): string {
    return "";
  }

}
