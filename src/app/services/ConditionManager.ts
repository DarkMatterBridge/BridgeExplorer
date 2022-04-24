import {BNode} from '../model/BNode';
import {HandAttributes} from '../model/HandAttributes';
import {BNodeComposite} from '../model/BNodeComposite';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConditionManager {

  buildNextBNC(bNodeComposite: BNodeComposite, newBnode: BNode): BNodeComposite {
    let lcb = bNodeComposite.lastContractBid;
    let newBid = '';
    if (isNaN(+newBnode.bid)) { // i.e. newBnode.bid is a not number
      newBid = newBnode.bid;
      if (newBnode.bid.isContractBid()) {
        lcb = newBnode.bid;
      }
    } else {       // i.e. newBnode.bid is a number
      newBid = this.addStepsToBid(bNodeComposite.lastContractBid, +newBnode.bid);
      lcb = newBid;
    }

    const handAttributes = new HandAttributes();
    handAttributes.attributes = new Map(bNodeComposite.handAttributes.attributes);

    // replace condition (important for part after "/")
    const allVariablesReplaced = this.substituteCondition(newBnode.con, handAttributes);
    // split condition to cond  + newdefintions
    const [conditionPart, definitionPart] = this.split(allVariablesReplaced);
    // parse new definitions to attributes
    this.addAttributes(handAttributes, definitionPart);
    // replace cond by attributes as new condition
    const substitutedCondition = this.substituteCondition(conditionPart, handAttributes);

    return new BNodeComposite(newBnode, newBid, lcb, substitutedCondition, handAttributes);
  }

  private substituteCondition(condition: string, handAttributes: HandAttributes): string {
    let substitutedCondition = condition;
    handAttributes.attributes.forEach((value, key) => {
      console.log('match: ', condition, key, value);
      substitutedCondition = substitutedCondition.split(key).join(value);
      console.log('---    ', substitutedCondition);
    });
    return substitutedCondition;
  }

  addStepsToBid(bid: string, steps: number): string {

    const b = ['C', 'D', 'H', 'S', 'N', 'C', 'D', 'H', 'S', 'N'];
    const index = b.findIndex(x => x === bid.charAt(1));
    if (index >= 0) {
      const newIndex = index + steps;
      const levelUp = Math.floor(newIndex / 5);
      // var num = ~~(a / b);
      // var num = (a / b) >> 0;
      const level = +bid.charAt(0) + levelUp;
      const suitNo = newIndex % 5;
      return level + b[suitNo];
    }
    // return bid;
    return steps.toString();  // todo is this right?
  }

  addAttributes(handAttributes: HandAttributes, definitions: string): void {
    if (definitions.length > 0) {
      definitions.split(',').forEach(x => this.parseAndAddAttribute(handAttributes, x));
    }
  }

  split(condition: string): Array<string> {
    const regex = /(.+)(\/)(.+)/;
    const a = regex.exec(condition);
    if (a != null) {
      return [a[1], a[3]];
    } else {
      return [condition, ''];
    }
  }

  parseAndAddAttribute(handAttributes: HandAttributes,  definition: string): void {
    const regex = /(.+)(:=)(.+)/;
    const a = regex.exec(definition);
    if (a != null) {
      handAttributes.attributes.set(a[1].trim(), a[3].trim());
      console.log('set attribute: ' + a[1] + '->' + a[3]);
      //   if (a[1].trim() === '$Suit1') {
      //     this.fillOtherMajor();
      //   }
      //   if (a[1].trim() === '$Suit2' && this.attributes.has('$Suit1')) {
      //     this.fillLowAndHigh();
      //   }
    }
  }


}
