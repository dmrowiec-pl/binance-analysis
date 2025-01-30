import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisService } from './analysis.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { PriceChangeData } from './PriceChangeData';

describe('price changes analysis', () => {
  let service: AnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalysisService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => of([])),
          },
        },
      ],
    }).compile();

    service = module.get<AnalysisService>(AnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('')
});

describe('price change data', () => {
  it('should properly calculate min value', () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const priceChangesData = new PriceChangeData(prices);

    expect(priceChangesData.min).toBe(1);
  });

  it('should properly calculate max value', () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const priceChangesData = new PriceChangeData(prices);

    expect(priceChangesData.max).toBe(10);
  });

  it('should properly calculate average value', () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const priceChangesData = new PriceChangeData(prices);

    expect(priceChangesData.average).toBe(5.5);
  });

  it('should properly calculate median value', () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const priceChangesData = new PriceChangeData(prices);

    expect(priceChangesData.median).toBe(6);
  });
});
