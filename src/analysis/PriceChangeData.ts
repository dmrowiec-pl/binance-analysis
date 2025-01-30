export class PriceChangeData {
  prices: number[];
  average: number;
  min: number;
  max: number;

  constructor(prices: number[]) {
    this.prices = [...prices];
    this.average = this.getAverage(prices);
    this.min = Math.min(...prices);
    this.max = Math.max(...prices);
  }

  public toString(): string {
    return `For the specified time period, the price started at ${this.min} and ended at ${this.max}. The average price was ${this.average}.`;
  }

  private getAverage(prices: number[]): number {
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  }
}
