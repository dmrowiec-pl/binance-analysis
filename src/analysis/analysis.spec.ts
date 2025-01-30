import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisService } from './analysis.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { PriceChangeData } from './PriceChangeData';

const TEST_KLINE_DTO = [
  [
    1737817200000,
    '104600.00000000',
    '105111.11000000',
    '104594.01000000',
    '104897.79000000',
    '540.70270000',
    1737820799999,
    '56707869.31974490',
    112985,
    '262.25319000',
    '27502157.04922820',
    '0',
  ],
  [
    1737820800000,
    '104897.79000000',
    '104989.49000000',
    '104591.67000000',
    '104654.90000000',
    '424.39657000',
    1737824399999,
    '44465354.21875480',
    94172,
    '192.26343000',
    '20146625.44818590',
    '0',
  ],
  [
    1737824400000,
    '104654.91000000',
    '104934.39000000',
    '104449.75000000',
    '104899.71000000',
    '546.35715000',
    1737827999999,
    '57197983.56100340',
    90143,
    '292.42323000',
    '30614509.98674370',
    '0',
  ],
  [
    1737828000000,
    '104899.72000000',
    '105286.52000000',
    '104843.25000000',
    '104983.49000000',
    '486.25249000',
    1737831599999,
    '51069802.08745380',
    82632,
    '205.97192000',
    '21633505.31787940',
    '0',
  ],
  [
    1737831600000,
    '104983.50000000',
    '105187.50000000',
    '104909.09000000',
    '105055.16000000',
    '374.57154000',
    1737835199999,
    '39356676.10694200',
    53910,
    '190.20116000',
    '19984511.02231960',
    '0',
  ],
];

describe('price changes analysis', () => {
  let service: AnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalysisService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: TEST_KLINE_DTO })),
          },
        },
      ],
    }).compile();

    service = module.get<AnalysisService>(AnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return proper analysis result', async () => {
    const symbol = 'BTCUSDT';
    const interval = '1h';
    const startTime = new Date('2025-01-25T00:00:00');
    const endTime = new Date('2025-01-26T00:00:00');

    const analysisResult = await service.analyse(
      symbol,
      interval,
      startTime.getTime(),
      endTime.getTime(),
    );

    expect(analysisResult).toContain('started at 104654.9');
    expect(analysisResult).toContain('ended at 105055.16');
    expect(analysisResult).toContain('average price was 104898.21');
    expect(analysisResult).toContain('median price was 104899.71');
    expect(analysisResult).toContain(
      'Difference between the max and min price was 400.26',
    );
  });
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

  it('should properly calculate max diff', () => {
    const prices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const priceChangesData = new PriceChangeData(prices);

    expect(priceChangesData.maxDiff).toBe(10);
  });
});
