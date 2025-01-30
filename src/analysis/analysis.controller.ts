import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

// curl "http://localhost:3000/analysis?symbol=BTCUSDT&startTime=1737759600000&endTime=1737846000000"

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  analyse(
    @Query('symbol') symbol: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ): Promise<string> {
    if (!symbol || !startTime || !endTime) {
      throw new Error('Invalid input parameters');
    }
    return this.analysisService.analyse(symbol, startTime, endTime);
  }
}
