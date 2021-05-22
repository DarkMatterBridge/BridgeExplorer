export class PBNObject {

  source: string;
  _deal!: string;
  _west!: string;
  _north!: string;
  _east!: string;
  _south!: string;

  _bidding!: string;

  constructor(raw: string) {
    this.source = raw;
  }

  verify() {
    this.deal;
    this.west;
    this.east;
    this.north;
    this.south;
    this.hands();
  }

  public get deal(): string {
    if (this._deal) {
      return this._deal;
    }
    const regex = /.*\[Deal \"(.*)\"\]/;
    const a = regex.exec(this.source);
    console.log("regex called")
    if (a != null) {
      this._deal = a[1];
      console.log(this._deal)
      return this._deal;
    }
    throw  new Error("invvalid PBN: deal missing");
  }

  public get west(): string {
    if (this._west) return this._west;
    return this.contentFor("West");
  }

  public get north(): string {
    if (this._north) return this._north;
    return this.contentFor("North");
  }

  public get east(): string {
    if (this._east) return this._east;
    return this.contentFor("East");
  }

  public get south(): string {
    if (this._south) return this._south;
    return this.contentFor("South");
  }

  public contentFor(tag: string): string {
    const regex = new RegExp(`.*\\[${tag} \\"(.*)\\"\\]`);  // attention: double escaping! \\[ > \[ > means [
    const a = regex.exec(this.source);
    if (a != null) {
      console.log(a)
      return a[1];
    }
    throw  new Error(`invvalid PBN: ${tag} missing`);
  }

  public hands(): string[] {
    return PBNObject.hands(this.deal);
  }

  static hands(deal: string): string[] {
    console.log(deal)
    const regex = /(.*)\s(.*)\s(.*)\s(.*)/;
    const a = regex.exec(deal);
    console.log(a);
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

  public get bidding(): string {
    if (this._bidding) return this._bidding;
    const regex = /.*\[Auction \"(.*)\"\]([\s\w]*)/;
    const a = regex.exec(this.source);
    console.log(a);
    if (a != null) {
      this._bidding = a[2];
      alert (this._bidding)
      return this._bidding;
    }
    throw  new Error("invalid PBN: bidding not found");
  }


}
