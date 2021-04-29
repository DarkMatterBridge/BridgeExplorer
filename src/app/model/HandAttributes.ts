import {karmaTargetSpec} from "@angular-devkit/build-angular/src/test-utils";

export class HandAttributes {

  suit1: number | undefined;
  suit2: number | undefined;

  attributes: Map<string, string> = new Map<string, string>();

  parse(condition: string): string {

    let condition1 = condition;
    const regex = /(.+)(\/)(.+)/;
    const a = regex.exec(condition);
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
      condition = condition.replace(key,value);
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
    }
  }

}
