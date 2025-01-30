import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  analyse(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ): Promise<string> {
    if (!symbol || !interval || !startTime || !endTime) {
      throw new Error('Invalid input parameters');
    }
    return this.analysisService.analyse(symbol, interval, startTime, endTime);
  }
}
