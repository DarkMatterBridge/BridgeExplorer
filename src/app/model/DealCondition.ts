import {DealHandCondition} from "./DealHandCondition";
import {DealHand} from "./DealHand";
import {Deal} from "./Deal";

export class DealCondition {

  directionConditions: DealHandCondition[];

  constructor() {
    this.directionConditions = new Array();
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
  }

  check(deal: Deal) {
    return this.directionConditions[0].eval(deal.getDealHand(1)) &&
      this.directionConditions[1].eval(deal.getDealHand(2)) &&
      this.directionConditions[2].eval(deal.getDealHand(3)) &&
      this.directionConditions[3].eval(deal.getDealHand(4));
  }

  import(dealConditionSequence: string[]) {
    let west = "";
    let east = "";
    if (dealConditionSequence.length > 1) {
      for (let i = 1; i < dealConditionSequence.length; i++) {
        if (i % 2 === 1)
          west += (west === "" ? "" : " & ") + dealConditionSequence[i];
        else
          east += (east === "" ? "" : " & ") + dealConditionSequence[i];
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

  parseConditions() {
    this.directionConditions[0].importAndParseCondition("");

  }

}
