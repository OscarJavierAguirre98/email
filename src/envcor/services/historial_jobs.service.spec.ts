import { Test, TestingModule } from '@nestjs/testing';
import { HistorialJobsService } from './historial_jobs.service';

describe('HistorialJobsService', () => {
  let service: HistorialJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialJobsService],
    }).compile();

    service = module.get<HistorialJobsService>(HistorialJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
