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
    if (dealConditionSequence.length > 1) {
      this.northCondition.importAndParseCondition(dealConditionSequence[1]);
    }
  }

  parseConditions() {
    this.directionConditions[0].importAndParseCondition("");

  }

}
