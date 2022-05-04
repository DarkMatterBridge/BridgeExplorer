import {DealHand} from './DealHand';
import {HandAttributes} from './HandAttributes';

export class DealHandCondition {

  handAttributes: HandAttributes = new HandAttributes();
  lowPoints: number | undefined;
  highPoints: number | undefined;

  condition = '';

  public conditionChecker: ConditionChecker = (dh: DealHand) => true;

  constructor() {
  }

  // check(hand: DealHandCondition): boolean {
  //   return this.conditionChecker === undefined ? true : this.conditionChecker(hand);
  // }

  importAndParseCondition(cond: string): boolean {
    this.condition = cond;
    return this.parseCondition();
  }

  addAndParseCondition(cond: string): boolean {
    return this.addConditionDynamically(cond);
  }

  addCondition(cond: string): void {
    // cond = this.handAttributes.parse(cond);  //  moved out of dealhandcondition; not necessary any longer; done before
    if (this.condition === '') {
      this.condition = cond;
    } else {
      this.condition += ' & ' + cond;
    }
  }

  addConditionDynamically(cond: string): boolean {
    const addCondition = this.condition.trim();
    if (addCondition.length === 0) {
      return true;
    }
    try {
      const ff = this.parseConditionWorker(this.condition);
      if (ff) {
        const fff = ff;
        console.log('Successfully parsed and added');
        this.conditionChecker = (hand: DealHand) => this.conditionChecker(hand) && fff(hand);
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
      return false;
    }
  }

  parseCondition(): boolean {
    this.condition = this.condition.trim();
    if (this.condition.length === 0) {
      return true;
    }
    try {
      this.conditionChecker = this.parseConditionWorker(this.condition);
      return true;
    } catch (e: any) {
      return false;
    }
  }


  parseConditionWorker(cond: string): ConditionChecker {

    console.log('Parsing: ' + cond);

    let f1: ConditionCheckerTemp;

    f1 = this.parseForPrioAnd(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForOr(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForAnd(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForNegation(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseAsAtom(cond);
    if (f1 !== undefined) {
      return f1;
    }
    console.log('Error: ' + cond + ' could not be parsed.');
    throw new Error(cond + ' could not be parsed.');
//    return undefined;

  }

  parseForNegation(cond: string): ConditionCheckerTemp {

    const regex = /(\!)(.*)/;
    const a = regex.exec(cond);

    if (a !== null) {
      const f1 = this.parseConditionWorker(a[2]);
      if (f1 !== undefined) {
        return (hand: DealHand) => !f1(hand);
      }
    }
    return undefined;
  }

  // structural parsings

  parseForOr(cond: string): ConditionCheckerTemp {

    const regex = /(.+)\s(or|\|)(.*)/;
    const a = regex.exec(cond);
    if (a !== null) {
      const evax = a[1];
      const evay = a[3];
      const f1 = this.parseConditionWorker(evax.trim());
      const f2 = this.parseConditionWorker(evay.trim());
      if (f1 !== undefined && f2 !== undefined) {
        console.log('Or successfully parsed');
        return (hand: DealHand) => f1(hand) || f2(hand);
      }
    }
    return undefined;
  }

  parseForPrioAnd(cond: string): ConditionCheckerTemp {

    const regex = /(.+)(\&)(.*)/;
    const a = regex.exec(cond);
    if (a !== null) {
      const evax = a[1];
      const evay = a[3];
      const f1 = this.parseConditionWorker(evax.trim());
      const f2 = this.parseConditionWorker(evay.trim());
      if (f1 !== undefined && f2 !== undefined) {
        console.log('And successfully parsed');
        return (hand: DealHand) => f1(hand) && f2(hand);
      }
    }
    return undefined;
  }

  parseForAnd(cond: string): ConditionCheckerTemp {

    const regex = /(.+)(,|with)(.*)/;
    const a = regex.exec(cond);
    if (a !== null) {
      const evax = a[1];
      const evay = a[3];
      const f1 = this.parseConditionWorker(evax.trim());
      const f2 = this.parseConditionWorker(evay.trim());
      if (f1 !== undefined && f2 !== undefined) {
        console.log('And successfully parsed');
        return (hand: DealHand) => f1(hand) && f2(hand);
      }
    }
    return undefined;
  }

  /// Atoms parsing
  parseAsAtom(cond: string): ConditionCheckerTemp {

    const checks: ((cond: string) => ConditionCheckerTemp)[] = [this.parseForContols];

    for (let i = 0; i < checks.length; i++) {
      const f = checks[i](cond);
      if (f !== undefined) {
        return f;
      }
    }

    let f1 = this.parseForIgnorables(cond);
    if (f1 !== undefined) {
      return f1;
    }

    // f1 = this.parseForMajor(cond);
    // if (f1 !== undefined) {
    //   return f1;
    // }

    // f1 = this.parseForMinor(cond);
    // if (f1 !== undefined) {
    //   return f1;
    // }

    f1 = this.parseForNoCardsInSuit(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForPointsInSuit(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForDistribution(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForPlus(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForMinus(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForInterval(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForUnbalanced(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForBalanced(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForMin(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForMax(cond);
    if (f1 !== undefined) {
      return f1;
    }

    f1 = this.parseForSpecialities(cond);
    if (f1 !== undefined) {
      return f1;
    }

    return undefined;
  }


  parseForContols(cond: string): ConditionCheckerTemp {

    console.log("Check for controls");
    const regex = /(\d+)(\+|\-)?controls$/;
    const a = regex.exec(cond);

    if (a !== null) {
      const controls = +a[1];
      if (a[2] === '+') {
        return (hand: DealHand) => hand.controls() >= controls;
      } else if (a[2] === '-') {
        return (hand: DealHand) => hand.controls() <= controls;
      } else {
        return (hand: DealHand) => hand.controls() === controls;
      }
    }
    return undefined;
  }

  parseForPlus(cond: string): ((hand: DealHand) => boolean) | undefined {

    const regex = /(\d+)\+$/;
    const a = regex.exec(cond);

    if (a !== null) {
      const lp = this.lowPoints = +a[1];
      return (hand: DealHand) => hand.points() >= lp;
    } else {
      return undefined;
    }
  }

  parseForMinus(cond: string): ConditionCheckerTemp { // todo check low and high point logic !

    const regex = /(\d+)\-$/;
    const a = regex.exec(cond);

    if (a !== null) {
      const hp = this.highPoints = +a[1];
      return (hand: DealHand) => hand.points() <= hp;
    } else {
      return undefined;
    }
  }

  parseForNoCardsInSuit(cond: string): ConditionCheckerTemp {

    const regex = /^(\d{1,2})(\+|\-)?(S|H|D|C|a|M|m|\$[A-z0-9]+)$/;
    const a = regex.exec(cond.trim());

    if (a !== null) {
      const length = +a[1];
      const suit = a[3];
      if (suit === 'a') {
        if (a[2] === '+') {
          return (hand: DealHand) => hand.cardsInSuit(0) >= length ||
            hand.cardsInSuit(1) >= length ||
            hand.cardsInSuit(2) >= length ||
            hand.cardsInSuit(3) >= length;
        }
        if (a[2] === '-') {
          return (hand: DealHand) => hand.cardsInSuit(0) <= length ||
            hand.cardsInSuit(1) <= length ||
            hand.cardsInSuit(2) <= length ||
            hand.cardsInSuit(3) <= length;
        }
        if (a[2] === undefined) {
          return (hand: DealHand) => hand.cardsInSuit(0) === length ||
            hand.cardsInSuit(1) === length ||
            hand.cardsInSuit(2) === length ||
            hand.cardsInSuit(3) === length;
        }
      }
      if (suit === 'M') {
        if (a[2] === '+') {
          return (hand: DealHand) => (hand.cardsInSuit(2) >= length ||
            hand.cardsInSuit(3) >= length);
        } else if (a[2] === '-') {
          return (hand: DealHand) => (hand.cardsInSuit(2) <= length ||
            hand.cardsInSuit(3) <= length);
        } else {
          return (hand: DealHand) => (hand.cardsInSuit(2) === length ||
            hand.cardsInSuit(3) === length);
        }
      }

      if (suit === 'm') {
        if (a[2] === '+') {
          return (hand: DealHand) => (hand.cardsInSuit(0) >= length ||
            hand.cardsInSuit(1) >= length);
        }
        if (a[2] === '-') {
          return (hand: DealHand) => (hand.cardsInSuit(0) <= length ||
            hand.cardsInSuit(1) <= length);
        }
        return (hand: DealHand) => (hand.cardsInSuit(0) === length ||
          hand.cardsInSuit(1) === length);
      }

      const suitNo = this.determineSuit(suit);
      if (a[2] === '+') {
        return (hand: DealHand) => hand.cardsInSuit(suitNo) >= length;
      } else if (a[2] === '-') {
        return (hand: DealHand) => hand.cardsInSuit(suitNo) <= length;
      } else {
        return (hand: DealHand) => hand.cardsInSuit(suitNo) === length;
      }
    }
    return undefined;
  }

  parseForPointsInSuit(cond: string): ConditionCheckerTemp {

    const regex = /(\d+)(\+|\-)?(S|H|D|C|\$[A-z0-9]+)points/;
    const a = regex.exec(cond.trim());

    if (a !== null) {
      const lp = +a[1];
      const suit = a[3];
      const suitNo = this.determineSuit(suit);
      return (hand: DealHand) => hand.pointsInSuit(suitNo) >= lp;
    } else {
      return undefined;
    }
  }

  parseForDistribution(cond: string): ConditionCheckerTemp {

    const regex = /(\d\d\d\d)(.?)/;
    const a = regex.exec(cond);
    let f1: Function;

    if (a !== null) {
      const distri = a[1];
      if (a[2] === 'a') {
        return (hand: DealHand) => hand.distribution() === distri;
      } else {
        return (hand: DealHand) => hand.cardsInSuit(3) === +distri.substr(0, 1) &&
          hand.cardsInSuit(2) === +distri.substr(1, 1) &&
          hand.cardsInSuit(1) === +distri.substr(2, 1) &&
          hand.cardsInSuit(0) === +distri.substr(3, 1);
      }
    }
    return undefined;
  }

  parseForMajor(cond: string): ConditionCheckerTemp {
    const regex = /(\d+)(\+|\-)?M/;
    const a = regex.exec(cond);
    if (a !== null) {
      const length = +a[1];
      if (a[2] === '+') {
        return (hand: DealHand) => (hand.cardsInSuit(2) >= length || hand.cardsInSuit(3) >= length);
      } else if (a[2] === '-') {
        return (hand: DealHand) => (hand.cardsInSuit(2) <= length || hand.cardsInSuit(3) <= length);
      } else {
        return (hand: DealHand) => (hand.cardsInSuit(2) === length || hand.cardsInSuit(3) === length);
      }
    }
    return undefined;
  }

  parseForIgnorables(cond: string): ConditionCheckerTemp {
    const regex = /f1|F1|forced|asking|GF|gf|must|elay|Asking|inv|to play|SI/;
    const a = regex.exec(cond);
    if (a !== null) {
      return (hand: DealHand) => true;
    }
    return undefined;
  }


  parseForMinor(cond: string): ConditionCheckerTemp {
    const regex = /(\d+)(\+|\-)?m/;
    const a = regex.exec(cond);
    if (a !== null) {
      const length = +a[1];
      if (a[2] === '+') {
        return (hand: DealHand) => (hand.cardsInSuit(0) >= length || hand.cardsInSuit(1) >= length);
      }
      if (a[2] === '-') {
        return (hand: DealHand) => (hand.cardsInSuit(0) <= length || hand.cardsInSuit(1) <= length);
      }
      return (hand: DealHand) => (hand.cardsInSuit(0) === length || hand.cardsInSuit(1) === length);
    }
    return undefined;
  }

  parseForInterval(cond: string): ConditionCheckerTemp {
    const regex = /(\d+)\-(\d+)/;
    const a = regex.exec(cond);
    if (a !== null) {
      if (this.lowPoints === undefined) {
        this.lowPoints = +a[1];
      } else {
        this.lowPoints = Math.max(+a[1], this.lowPoints);
      }
      if (this.highPoints === undefined) {
        this.highPoints = +a[2];
      } else {
        this.highPoints = Math.min(+a[2], this.highPoints);
      }
      return (hand: DealHand) => (hand.points() >= +a[1]) && (hand.points() <= +a[2]);
    }
    return undefined;

  }

  parseForBalanced(cond: string): ConditionCheckerTemp {
    const regex = /(bal)/;
    const a = regex.exec(cond);

    if (a !== null) {
      return (hand: DealHand) => hand.isBalanced();
    } else {
      return undefined;
    }
  }

  parseForUnbalanced(cond: string): ConditionCheckerTemp {
    const regex = /(unbal)/;
    const a = regex.exec(cond);

    if (a !== null) {
      return (hand: DealHand) => !hand.isBalanced();
    } else {
      return undefined;
    }
  }

  parseForMin(cond: string): ConditionCheckerTemp {
    const regex = /(min)/;
    const a = regex.exec(cond);

    if (a !== null) {
      if (this.lowPoints === undefined) {
        throw Error('lowpoints not defined');
      }
      let hp: number;
      if (this.highPoints === undefined) {
        hp = this.lowPoints + 1;
      } else {
        hp = (this.lowPoints + this.highPoints) / 2;
      }
      this.highPoints = hp;
      return (hand: DealHand) => hand.points() <= hp;
    } else {
      return undefined;
    }
  }

  parseForMax(cond: string): ConditionCheckerTemp {
    const regex = /(max)/;
    const a = regex.exec(cond);
    if (a !== null) {
      if (this.highPoints === undefined) {
        throw Error('highpoints not defined');
      }
      let lp: number;
      if (this.lowPoints === undefined) {
        lp = this.highPoints - 2;
      } else {
        lp = (this.lowPoints + this.highPoints) / 2;
      }
      this.lowPoints = lp;
      return (hand: DealHand) => hand.points() >= lp;
    } else {
      return undefined;
    }
  }

  parseForSI(cond: string): ConditionCheckerTemp {
    const regex = /(SI)/;
    const a = regex.exec(cond.trim());

    if (a !== null) {
//      this.lowPoints = (this.lowPoints + this.highPoints) / 2;
      return (hand: DealHand) => true;
    } else {
      return undefined;
    }
  }


  parseForSpecialities(cond: string): ConditionCheckerTemp {

    let suit;
    let regex = /(S|H|D|C|\$[A-z0-9]+)(\.8playable2void)/;
    let a = regex.exec(cond.trim());
    if (a !== null) {
      suit = a[1];
      const suitNo = this.determineSuit(suit);
      return (hand: DealHand) => hand.is8playable2void(suitNo);
    }
    regex = /(S|H|D|C|\$[A-z0-9]+)(\.goodSuit)/;
    a = regex.exec(cond.trim());
    if (a !== null) {
      suit = a[1];
      const suitNo = this.determineSuit(suit);
      return (hand: DealHand) => hand.isGoodSuit(suitNo);
    }
    regex = /(S|H|D|C|\$[A-z0-9]+)(\.semisolid)/;
    a = regex.exec(cond.trim());
    if (a !== null) {
      suit = a[1];
      const suitNo = this.determineSuit(suit);
      return (hand: DealHand) => hand.isSemiSolid(suitNo);
    }
    regex = /(3suiter)/;
    a = regex.exec(cond.trim());
    if (a !== null) {
      return (hand: DealHand) => hand.is3suiter();
    }
    regex = /(S|H|D|C|\$[A-z0-9]+)(\-values)/;
    a = regex.exec(cond.trim());
    if (a !== null) {
      suit = a[1];
      const suitNo = this.determineSuit(suit);
      return (hand: DealHand) => hand.hasValues(suitNo);
    }
    regex = /(S|H|D|C|\$[A-z0-9]+)(\-control)/;
    a = regex.exec(cond.trim());
    if (a !== null) {
      suit = a[1];
      const suitNo = this.determineSuit(suit);
      return (hand: DealHand) => hand.hasControl(suitNo);
    }

    regex = /^(\d{1,2})(\+|\-)?(S|H|D|C|a|\$[A-z0-9]+).points$/;
    a = regex.exec(cond.trim());
    let f1: ConditionCheckerTemp;
    if (a !== null) {
      const length = +a[1];
      suit = a[3];
      const suitNo = this.determineSuit(suit);
      if (a[2] === '+') {
        f1 = (hand: DealHand) => hand.pointsInSuit(suitNo) >= length;
      } else if (a[2] === '-') {
        f1 = (hand: DealHand) => hand.pointsInSuit(suitNo) <= length;
      } else {
        f1 = (hand: DealHand) => hand.pointsInSuit(suitNo) === length;
      }
      return f1;
    }
    return undefined;
  }


  private determineSuit(suit: string): number {
    switch (suit) {
      case 'S':
        return 3;
      case 'H':
        return 2;
      case 'D':
        return 1;
      case 'C':
        return 0;
      default:
        return 3;
    }
  }
}


// 3+Dpoints

// A or B and C
// (A or B) and C
// (A or B) and C or D
// (A and B or C ) and D

// add  ^ to beginning of some lines

type ConditionCheckerTemp = ((dealHand: DealHand) => boolean) | undefined;
type ConditionChecker = ((dealHand: DealHand) => boolean);
