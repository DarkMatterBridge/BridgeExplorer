interface String {
  center(maxLength: number, fillString?: string): string;

  isContractBid(): boolean;

  isBid(): boolean;

  isStrain(): boolean;
}

String.prototype.center = function (maxLength: number, fillString?: string): string {
  fillString = fillString || " "; // If fillString is undefined, use space as default
  return this.length >= maxLength ? this.toString() : this.padStart((this.length + maxLength) / 2, fillString).padEnd(maxLength, fillString);
}

String.prototype.isStrain = function (): boolean {
  // if (this.length !=1 ) return false;
  return ['C', 'D', 'H', 'S', 'N', 'NT'].includes(this.toString());
}

String.prototype.isContractBid = function (): boolean {
  if (this.length <= 1) return false;
  const level = this.charAt(0);
  if (isNaN(+level))
    return false;
  return ['C', 'D', 'H', 'S', 'N', 'NT'].includes(this.substr(1));
}

String.prototype.isBid = function (): boolean {
  if (this == 'P' || this == 'X' || this == 'XX') return true;
  return this.isContractBid();
}
