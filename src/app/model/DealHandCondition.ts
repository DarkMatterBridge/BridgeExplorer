import {DealHand} from "./DealHand";

export class DealHandCondition {

  lowPoints = 0;
  highPoints = 30;

  public eval: Function;

  constructor() {
    this.eval = (x: DealHand) => true;
  }

  check(hand: DealHandCondition): boolean {
    return this.eval(hand);
  }

  parseCondition(cond: string): boolean {

    let ff = this.parseConditionWorker(cond);
    if (ff) {
      this.eval = ff;
      return true;
    }
    return false;
  }

  parseConditionWorker(cond: string): Function | undefined {

    let f1 = this.parseForAnd(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForNegation(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForSuit(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForMajor(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForPlus(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForMinus(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForInterval(cond)
    if (f1 != undefined) return f1;

    f1 = this.parseForBalanced(cond)
    if (f1 != undefined) return f1;

    return undefined;

  }

  parseForNegation(cond: string): Function | undefined {

    const regex = /(\!)(.*)/;
    const a = regex.exec(cond);

    if (a != null) {
      let cond = a[2];
      const f1 = this.parseConditionWorker(cond);
      if (f1 !== undefined) {
        return (hand: DealHand) => !f1(hand);
      }
    }
    return undefined;
  }

  parseForPlus(cond: string): Function | undefined {

    const regex = /(\d+)\+/;
    const a = regex.exec(cond);
    let f1: Function;

    if (a != null) {
      this.lowPoints = +a[1];
      f1 = (hand: DealHand) => hand.points() >= this.lowPoints;
      return f1;
    } else return undefined;
  }

  parseForMinus(cond: string): Function | undefined {

    const regex = /(\d+)\-$/;
    const a = regex.exec(cond);
    let f1: Function;

    if (a != null) {
      this.highPoints = +a[1];
      f1 = (hand: DealHand) => hand.points() <= this.highPoints;
      return f1;
    } else return undefined;
  }


  parseForAnd(cond: string): Function | undefined {

    const regex = /(.+)(with|,)(.*)/;
    const a = regex.exec(cond);
    if (a != null) {
      let evax = a[1];
      let evay = a[3];
      const f1 = this.parseConditionWorker(evax);
      const f2 = this.parseConditionWorker(evay);
      if (f1 !== undefined && f2 !== undefined) {
        return (hand: DealHand) => f1(hand) && f2(hand);
      }
    }
    return undefined;
  }


  parseForSuit(cond: string): Function | undefined {

    const regex = /(\d+)(\+|\-)?(S|H|D|C)/;
    const a = regex.exec(cond);
    var f1: Function;

    if (a != null) {
      var length = +a[1];
      var suit = a[3];
      var suitNo = 0;
      if (suit == "S") suitNo = 3;
      if (suit == "H") suitNo = 2;
      if (suit == "D") suitNo = 1;
      if (suit == "C") suitNo = 0;
      if (a[2] == "+")
        f1 = (hand: DealHand) => hand.cardsInSuit(suitNo) >= length;
      else if (a[2] == "-")
        f1 = (hand: DealHand) => hand.cardsInSuit(suitNo) <= length;
      else
        f1 = (hand: DealHand) => hand.cardsInSuit(suitNo) == length;
      return f1;
    }
    return undefined;
  }

  parseForMajor(cond: string): Function | undefined {
    const regex = /(\d+)(\+|\-)?M/;
    const a = regex.exec(cond);
    if (a != null) {
      var length = +a[1];
      if (a[2] == "+") {
        return (hand: DealHand) => (hand.cardsInSuit(2) >= length || hand.cardsInSuit(3) >= length);
      }
    }
    return undefined;
  }

  parseForInterval(cond: string): Function | undefined {
    const regex = /(\d+)\-(\d+)/;
    const a = regex.exec(cond);
    if (a != null) {
      this.lowPoints = +a[1];
      this.highPoints = +a[2];
      return (hand: DealHand) => (hand.points() >= this.lowPoints) && (hand.points() <= this.highPoints);
    }
    return undefined;

  }


  parseForBalanced(cond: string): Function | undefined {

    const regex = /(bal)/;
    const a = regex.exec(cond);
    let f1: Function;

    if (a != null) {
      f1 = (hand: DealHand) => hand.isBalanced();
      return f1;
    } else return undefined;
  }

}
