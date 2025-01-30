export class PriceChangeData {
  prices: number[];
  min: number;
  max: number;
  average: number;
  median: number;
  maxIncrease: number;
  maxDecrease: number;

  constructor(prices: number[]) {
    this.prices = [...prices];
    this.min = Math.min(...prices);
    this.max = Math.max(...prices);
    this.average = this.calculateAverage(prices);
    this.median = this.calculateMedian(prices);
  }

  public toString(): string {
    return `For the specified time period, the price started at ${this.min} and ended at ${this.max}. The average price was ${this.average}.`;
  }

  private calculateAverage(prices: number[]): number {
    return [...prices].reduce((a, b) => a + b, 0) / prices.length;
  }

  private calculateMedian(prices: number[]): number {
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const middlePrice = Math.floor(sortedPrices.length / 2);

    if (sortedPrices.length % 2 === 0) {
      return sortedPrices[middlePrice - 1] + sortedPrices[middlePrice] / 2;
    }

    return sortedPrices[middlePrice];
  }
}
