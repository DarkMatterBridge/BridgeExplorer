import {karmaTargetSpec} from "@angular-devkit/build-angular/src/test-utils";

export class HandAttributes {

  suit1: number | undefined;
  suit2: number | undefined;

  attributes: Map<string, string> = new Map<string, string>();

  parse(condition: string): string {

    let condition1 = this.matchAndReplace(condition);
    const regex = /(.+)(\/)(.+)/;
    const a = regex.exec(condition1);
    if (a != null) {
      this.parseAttributes(a[3]);
      console.log(this.attributes);
      condition1 = a[1];
    }
    return this.matchAndReplace(condition1);
  }

  matchAndReplace(condition: string) {
    this.attributes.forEach((value, key) => {
      console.log("match: ", condition, key, value);
      // condition = condition.replace(key, value);
      condition = condition.split(key).join(value);
      console.log("---    ", condition);
    })
    return condition;
  }

  parseAttributes(c: string) {
    c.split(",").forEach(x => this.parseAttribute(x));
  }

  parseAttribute(c: string) {
    const regex = /(.+)(\:\=)(.+)/;
    const a = regex.exec(c);
    if (a != null) {
      this.attributes.set(a[1].trim(), a[3].trim());
      console.log("set attribute: " + a[1] + "->" + a[3]);
      if (a[1].trim() === "$Suit1")
        this.fillOtherMajor();
      if (a[1].trim() === "$Suit2" && this.attributes.has("$Suit1"))
        this.fillLowAndHigh();
    }
  }

  fillLowAndHigh() {
    let suit1 = this.attributes.get("$Suit1");
    let suit2 = this.attributes.get("$Suit2");
    let lowhigh = ["S", "H", "D", "C"].filter(s => s !== suit1 && s !== suit2);
    this.attributes.set("$High", lowhigh[0]);
    this.attributes.set("$Low", lowhigh[1]);
  }

  fillOtherMajor() {
    let suit1 = this.attributes.get("$Suit1");
    let otherMajor = ["S", "H"].filter(s => s !== suit1);
    this.attributes.set("$oM", otherMajor[0]);

  }
}
