import { Test, TestingModule } from '@nestjs/testing';
import { EmailSendsService } from './email-sends.service';

describe('EmailSendsService', () => {
  let service: EmailSendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSendsService],
    }).compile();

    service = module.get<EmailSendsService>(EmailSendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
