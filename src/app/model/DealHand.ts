export class DealHand {

  cards: number[];
  cardsInSuitTable: number[] = new Array();

  constructor(cards: number[]) {
    this.cards = cards;
  }


  points(): number {
    return this.cards.reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 8, 0), 0);
  }

  pointsInSuit(suit: number): number {
    return this.cards.filter(card => (card>=suit*13 && card<suit*13+13)).reduce((sum, b) => sum + Math.max(Math.floor(b % 13) - 8, 0), 0);
  }

  cardsInSuit(suit: number): number {
    return this.cards.filter(card => (card>=suit*13 && card<suit*13+13)).length;
  }

  distribution(): string {
    return [3,2,1,0].map(i => this.cardsInSuit(i)).sort().reverse().reduce((a,b) => a+b, "");
  }

  isBalanced(): boolean {
    return this.cardsInSuit(3) * this.cardsInSuit(2) * this.cardsInSuit(1) * this.cardsInSuit(0) > 89;
  }

  isSemiBalanced(): boolean {
    return this.cardsInSuit(3) * this.cardsInSuit(2) * this.cardsInSuit(1) * this.cardsInSuit(0) > 71;
  }

}
