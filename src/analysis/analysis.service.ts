import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PriceChangeData } from './PriceChangeData';

// [
//   [
//     1499040000000,      // Kline open time
//     "0.01634790",       // Open price
//     "0.80000000",       // High price
//     "0.01575800",       // Low price
//     "0.01577100",       // Close price
//     "148976.11427815",  // Volume
//     1499644799999,      // Kline Close time
//     "2434.19055334",    // Quote asset volume
//     308,                // Number of trades
//     "1756.87402397",    // Taker buy base asset volume
//     "28.46694368",      // Taker buy quote asset volume
//     "0"                 // Unused field, ignore.
//   ]
// ]

type KlineData = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

const KLINE_DATA_CLOSE_PRICE_IDX = 4;

@Injectable()
export class AnalysisService {
  constructor(private httpService: HttpService) {}

  async analyse(
    symbol: string,
    startTime: number,
    endTime: number,
  ): Promise<string> {
    const klineDataForPeriod = await this.fetchHistoricalPrices(
      symbol,
      startTime,
      endTime,
    );

    const pricesForTimePeriod = this.getPricesFromKlineData(klineDataForPeriod);

    const pricesChangeData = new PriceChangeData(pricesForTimePeriod);

    return pricesChangeData.toString();
  }

  private async fetchHistoricalPrices(
    symbol: string,
    startTime: number,
    endTime: number,
  ): Promise<KlineData[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<KlineData[]>(
        'https://api.binance.com/api/v3/klines',
        {
          params: {
            symbol: symbol,
            interval: '1h',
            startTime: startTime,
            endTime: endTime,
          },
        },
      ),
    );

    return data;
  }

  private getPricesFromKlineData(klineData: KlineData[]): number[] {
    return klineData.map((kline) =>
      parseFloat(kline[KLINE_DATA_CLOSE_PRICE_IDX]),
    );
  }
}
