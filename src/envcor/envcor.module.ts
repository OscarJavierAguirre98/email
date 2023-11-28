import { Module } from '@nestjs/common';
import { envcorProvider } from './providers/envcor.providers';
import { JobsService } from './services/jobs.service';
import { HistorialJobsService } from './services/historial_jobs.service';
import { EmailService } from './services/email.service';
import { JobsController } from './controllers/jobs.controller';
import { EmailController } from './controllers/email.controller';
import { HistorialJobsController } from './controllers/historial_jobs.controller';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [...envcorProvider ,JobsService, HistorialJobsService, EmailService],
    controllers: [JobsController, EmailController, HistorialJobsController ],
    exports: [...envcorProvider ,JobsService, HistorialJobsService, EmailService],
})
export class EnvcorModule {}