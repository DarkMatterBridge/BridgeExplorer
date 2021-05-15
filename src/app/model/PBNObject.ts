export class PBNObject {

  source: string;
  _deal: any;

  constructor(raw: string) {
    this.source = raw;
  }

  public get deal() {
    if (this.deal) {
      return this._deal;
    }
    const regex = /.*\[Deal \"(.*)\"\]/;
    const a = regex.exec(this.source);
    if (a != null) {
      this._deal = a[0];
      return this._deal;
    }
    throw  new Error("invvalid PBN: deal missing");
  }

  public hands(no: number): string[] {
    return PBNObject.hands(this.deal);
  }

 static hands(deal: string): string[] {
   const regex = /(.*)\s(.*)\s(.*)\s(.*)/;
   const a = regex.exec(deal);
   if (a != null && a.length == 5) {
     let hands = [];
     hands.push(a[1]);
     hands.push(a[2]);
     hands.push(a[3]);
     hands.push(a[4]);
     return hands;
   }
   throw  new Error("invalid PBN: hands incomplete");
 }

//   [Deal
//   "S:T97.97543.K9.932 653.A6.AT764.KQT K2.KT8.QJ82.8754 AQJ84.QJ2.53.AJ6"
// ]

}
