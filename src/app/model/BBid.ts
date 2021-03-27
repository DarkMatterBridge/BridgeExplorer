import {Bid} from "./Bid";

export class BBid extends Bid {

  direction: string;

  constructor(level: number, denomination: string, direction: string) {
    super(level, denomination);
    this.direction = direction;
  }

}
