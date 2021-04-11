export class LinObject {

  source: string;
  par: any;

  deck = ["SA", "SK", "SQ", "SJ", "ST", "S9", "S8", "S7", "S6", "S5", "S4", "S3", "S2", "HA", "HK", "HQ", "HJ", "HT", "H9", "H8", "H7", "H6", "H5", "H4", "H3", "H2", "DA", "DK", "DQ", "DJ", "DT", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "CA", "CK", "CQ", "CJ", "CT", "C9", "C8", "C7", "C6", "C5", "C4", "C3", "C2"]

  constructor(raw: string) {
    this.source = raw;
  }

  public get parsed(): any {
    if (this.par) {
      return this.par;
    }
    var reg = /[\w]{2}\|[^\|]*\|/g;
    var m;
    let map = new Map();
    do {
      m = reg.exec(this.source);
      if (m) {
        let [key, value] = this.retrieve_pair(m.toString());
        this.addEntry(map, key, value);
      }
    } while (m);
    this.par = map;
    return this.par;
  }

// "md|some value here|", "md||"
  retrieve_pair(source: string) {
    let result = source.split("|");
    return [result[0], result[1]];

  }

  addEntry(map: Map<string, []>, key: string, value: string) {
    var x: any;
    if (map.has(key)) {
      x = map.get(key);
      x.push(value);
    } else {
      x = [value];
    }
    map.set(key, x);
  };

  hands(): string[] {
    return this.parsed.get("md")[0].split(",");
  }

  south(): string {
    return this.hands()[0].substr(1);
  }

  west(): string {
    return this.hands()[1];
  }

  north(): string {
    return this.hands()[2];
  }

  bids() {
    let bids = this.parsed.get("mb").map
    (
      (bid: string) => {
        switch (bid.toUpperCase()) {
          case "P":
            return "P";
          case "D":
            return "X";
            break;
          case "R":
            return "XX";
            break;
          default: {
            if (bid.match(/\dN/)) {
              return bid[0] + "NT";
            } else {
              return bid.toUpperCase();
            }
          }
        }
      }
    )
    return bids;
  }

  dealer(): string {
    switch (this.parsed.get("md")[0][0]) {
      case  "1":
        return "S"
      case  "2":
        return "W"
      case  "3":
        return "N"
      case  "4":
        return "E"
    }
    return "";
  }

  players() {
    return (this.parsed.get("pn"))[0].split(",");
  }
}
