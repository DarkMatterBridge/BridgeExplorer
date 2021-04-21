import {DealHandCondition} from "./DealHandCondition";
import {DealHand} from "./DealHand";

export class DealCondition {

  northCondition: DealHandCondition;
  southCondition: DealHandCondition;
  westCondition: DealHandCondition;
  eastCondition: DealHandCondition;

  constructor() {
    this.northCondition = new DealHandCondition();
    this.southCondition = new DealHandCondition();
    this.westCondition = new DealHandCondition();
    this.eastCondition = new DealHandCondition();
  }

  checkNorth(hand: DealHand): boolean {
    return this.northCondition.eval(hand);
  }

}
