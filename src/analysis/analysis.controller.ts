import { Controller, Get, Param } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  // private readonly symbol = 'BTCUSDT';

  constructor(private readonly analysisService: AnalysisService) {}

  @Get()
  analyse(
    @Param('symbol') symbol: string,
    @Param('startTime') startTime: number,
    @Param('endTime') endTime: number,
  ) {
    if (!symbol || !startTime || !endTime) {
      throw new Error('Invalid input parameters');
    }
    return this.analysisService.analyse(symbol, startTime, endTime);
  }
}
