export class HandAttributes {

  suit1: number | undefined;
  suit2: number | undefined;

  attributes: Map<string, string> = new Map<string, string>();

  constructor() {
  }


  public copyAndHandleCondition(condition: string): HandAttributes {
    const handAttributes = new HandAttributes();
    handAttributes.attributes = new Map( this.attributes);
    return handAttributes;
  }


  public  parse(condition: string): string {
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

  matchAndReplace(condition: string): string {
    this.attributes.forEach((value, key) => {
      console.log('match: ', condition, key, value);
      // condition = condition.replace(key, value);
      condition = condition.split(key).join(value);
      console.log('---    ', condition);
    });
    return condition;
  }

  parseAttributes(c: string): void {
    c.split(',').forEach(x => this.parseAttribute(x));
  }

  parseAttribute(c: string): void {
    const regex = /(.+)(\:\=)(.+)/;
    const a = regex.exec(c);
    if (a != null) {
      this.attributes.set(a[1].trim(), a[3].trim());
      console.log('set attribute: ' + a[1] + '->' + a[3]);
      if (a[1].trim() === '$Suit1') {
        this.fillOtherMajor();
      }
      if (a[1].trim() === '$Suit2' && this.attributes.has('$Suit1')) {
        this.fillLowAndHigh();
      }
    }
  }

  fillLowAndHigh(): void {
    const suit1 = this.attributes.get('$Suit1');
    const suit2 = this.attributes.get('$Suit2');
    const lowhigh = ['S', 'H', 'D', 'C'].filter(s => s !== suit1 && s !== suit2);
    this.attributes.set('$High', lowhigh[0]);
    this.attributes.set('$Low', lowhigh[1]);
  }

  fillOtherMajor(): void {
    const suit1 = this.attributes.get('$Suit1');
    const otherMajor = ['S', 'H'].filter(s => s !== suit1);
    this.attributes.set('$oM', otherMajor[0]);

  }
}
