import { Module } from '@nestjs/common';
import { DatabaseModule } from './envcor/database/database.module';
import { EnvcorModule } from './envcor/envcor.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, EnvcorModule,
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        port: 587,
        auth: {
          user: process.env.API_EMAIL_NOTIFICATIONS,
          pass: process.env.API_PASSWORD_EMAIL_NOTIFICATIONS,
        },
      },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
