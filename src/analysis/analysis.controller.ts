import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  /**
   * Fetches and analyses binance data for specified symbol, interval and time period.
   * Examplary call: curl "http://localhost:3000/analysis?symbol=BTCUSDT&interval=1h&startTime=1737759600000&endTime=1737846000000"
   */
  @Get()
  analyse(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ): Promise<string> {
    if (!symbol || !interval || !startTime || !endTime) {
      throw new BadRequestException('Invalid input parameters', {
        cause: new Error(),
        description: 'Invalid input parameters',
      });
    }

    return this.analysisService.analyse(symbol, interval, startTime, endTime);
  }
}
