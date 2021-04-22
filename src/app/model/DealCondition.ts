import {DealHandCondition} from "./DealHandCondition";
import {DealHand} from "./DealHand";
import {Deal} from "./Deal";

export class DealCondition {

  northCondition: DealHandCondition;
  southCondition: DealHandCondition;
  westCondition: DealHandCondition;
  eastCondition: DealHandCondition;

  directionConditions: DealHandCondition[];

  constructor() {
    this.northCondition = new DealHandCondition();
    this.southCondition = new DealHandCondition();
    this.westCondition = new DealHandCondition();
    this.eastCondition = new DealHandCondition();
    this.directionConditions = new Array();
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
    this.directionConditions.push(new DealHandCondition());
  }

  checkNorth(hand: DealHand): boolean {
    return this.northCondition.eval(hand);
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
        if (i % 2 === 0)
          west += (west === "" ? "" : ",") + dealConditionSequence[i];
        else
          east += (east === "" ? "" : ",") + dealConditionSequence[i];
      }
      //
      // if (dealConditionSequence.length === 2) {
      //   this.directionConditions[1].importAndParseCondition(dealConditionSequence[1]);
      // }
      // if (dealConditionSequence.length === 3) {
      //   this.directionConditions[1].importAndParseCondition(dealConditionSequence[1]);
      //   this.directionConditions[3].importAndParseCondition(dealConditionSequence[2]);
      // }
      // if (dealConditionSequence.length === 4) {
      //   this.directionConditions[1].importAndParseCondition(dealConditionSequence[1]+","+dealConditionSequence[3]);
      //   this.directionConditions[3].importAndParseCondition(dealConditionSequence[2]);
      // }
    }
    this.directionConditions[1].importAndParseCondition(west);
    this.directionConditions[3].importAndParseCondition(east);
  }

  parseConditions() {
    this.directionConditions[0].importAndParseCondition("");

  }

}
