export class LinFile {

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
    var n = 0;
    let map = new Map();
    do {
      m = reg.exec(this.source);
      if (m) {
        let [key, value] = this.retrieve_pair(m.toString());
        this.addEntry(map, key, value);
      }
      n = n + 1;
    } while (m);
    this.par = map;
    console.log(map);
//   scanner = StringScanner.new(source)
// @parsed = Hash.new { |hash, key| hash[key] = [] }
// until scanner.eos?
//   scanner.scan_until(/[\w]{2}\|[^\|]*\|/)
//   key, value = retrieve_pair(scanner.matched)
// @parsed[key] << value
// end
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
}
