interface String {
  center(maxLength: number, fillString?: string): string;

  isContractBid(): boolean;
}

String.prototype.center = function (maxLength: number, fillString?: string): string {
  fillString = fillString || " "; // If fillString is undefined, use space as default
  return this.length >= maxLength ? this.toString() : this.padStart((this.length + maxLength) / 2, fillString).padEnd(maxLength, fillString);
}

String.prototype.isContractBid = function (): boolean {
  if (this.length < 2 || this.length > 3) return false;
  const level = this.charAt(0);
  if (isNaN(+level))
    return false;
  return ['C','D','H','S','N'].includes(this.charAt(1));
}
