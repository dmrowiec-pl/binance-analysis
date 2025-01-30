import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PriceChangeData } from './PriceChangeData';

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
    interval: string,
    startTime: number,
    endTime: number,
  ): Promise<string> {
    const klineDataForPeriod = await this.fetchHistoricalPrices(
      symbol,
      interval,
      startTime,
      endTime,
    );

    const pricesForTimePeriod = this.getPricesFromKlineData(klineDataForPeriod);

    const pricesChangeData = new PriceChangeData(pricesForTimePeriod);

    return pricesChangeData.toString();
  }

  private async fetchHistoricalPrices(
    symbol: string,
    interval: string,
    startTime: number,
    endTime: number,
  ): Promise<KlineData[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<KlineData[]>(
        'https://api.binance.com/api/v3/klines',
        {
          params: {
            symbol: symbol,
            interval: interval,
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
