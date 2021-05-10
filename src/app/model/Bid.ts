export class Bid {

  level: number;
  denomination: string;

  constructor(level: number, denom: string) {
    this.level = level;
    this.denomination = denom;
  }

  static getBid(bidname: String) {
    const level = bidname.charAt(0);
    const denomination = bidname.charAt(1);
    if (this.isLevelOk(level) && this.isDenomOk(denomination)) {
      return new Bid(Number(level), denomination);
    } else {
      throw new Error("wrong format");
    }
  }

  private static isLevelOk(level: string): boolean {
    return (/[1-6].]/.test(level))
  }

  private static isDenomOk(level: string) {
    return (/[CDHSN].]/.test(level))
  }

  name() {
    return this.level + this.denomination;
  }

}
