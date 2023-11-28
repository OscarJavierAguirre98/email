import { Test, TestingModule } from '@nestjs/testing';
import { HistorialJobsController } from './historial_jobs.controller';

describe('HistorialJobsController', () => {
  let controller: HistorialJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialJobsController],
    }).compile();

    controller = module.get<HistorialJobsController>(HistorialJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
