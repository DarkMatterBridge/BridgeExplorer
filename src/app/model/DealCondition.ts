import {DealHandCondition} from './DealHandCondition';
import {Deal} from './Deal';

export class DealCondition {

  directionConditions: DealHandCondition[];

  constructor() {
    this.directionConditions = [];
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
  }

  check(deal: Deal): boolean {
    return this.directionConditions[0].conditionChecker(deal.getDealHand(1)) &&
      this.directionConditions[1].conditionChecker(deal.getDealHand(2)) &&
      this.directionConditions[2].conditionChecker(deal.getDealHand(3)) &&
      this.directionConditions[3].conditionChecker(deal.getDealHand(4));
  }


  importNew(dealConditionSequence: string[], dealer: string): boolean[] {
    const map = new Map([['S', 0], ['W', 1], ['N', 2], ['E', 3]]);
    const x = map.get(dealer);
    let start = 0;
    if (x !== undefined) {
      start = x;
    }
    console.log(dealConditionSequence);
    if (dealConditionSequence.length > 0) {
      for (let i = 0; i < dealConditionSequence.length; i++) {
        this.directionConditions[(i + start) % 4].addCondition(dealConditionSequence[i]);
      }
    }
    return [this.directionConditions[0].parseCondition(),
      this.directionConditions[1].parseCondition(),
      this.directionConditions[2].parseCondition(),
      this.directionConditions[3].parseCondition()];
  }

  import(dealConditionSequence: string[]): void { // TODO unused
    let west = '';
    let east = '';
    if (dealConditionSequence.length > 1) {
      for (let i = 1; i < dealConditionSequence.length; i++) {
        if (i % 2 === 1) {
          west += (west === '' ? '' : ' & ') + dealConditionSequence[i];
        } else {
          east += (east === '' ? '' : ' & ') + dealConditionSequence[i];
        }
      }
    }
    this.directionConditions[1].importAndParseCondition(west);
    this.directionConditions[3].importAndParseCondition(east);

    // if (dealConditionSequence.length > 1) {
    //   for (let i = 1; i < dealConditionSequence.length; i++) {
    //     if (i % 2 === 1)
    //       west += (west === "" ? "" : " & ") + dealConditionSequence[i];
    //     else
    //       east += (east === "" ? "" : " & ") + dealConditionSequence[i];
    //   }
    // }
    // this.directionConditions[1].importAndParseCondition(west);
    // this.directionConditions[3].importAndParseCondition(east);
  }

  // parseConditions() {
  //   this.directionConditions[0].importAndParseCondition('');
  //
  // }

}
