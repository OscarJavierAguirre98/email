import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

// Para obtener los datos del JobsDto a partir de un cron, puedes crear un método en el servicio que convierta la fecha y hora proporcionadas por el usuario en una expresión de cron utilizando alguna biblioteca de manejo de fechas, como node-cron.

// Primero, instala la biblioteca cron-parser para analizar la expresión cron:

// bash
// Copy code
// npm install cron-parser
// Luego, podrías crear un método en el servicio JobsService que tome la fecha y hora proporcionadas por el usuario y devuelva la expresión de cron correspondiente. Además, este método podría usar la función sendMail para enviar el correo en el momento específico definido por la expresión cron generada.

// typescript
// Copy code
// import { Injectable } from '@nestjs/common';
// import { JobsDto } from '../dto/jobs.dto';
// import { CronParser } from 'cron-parser';

// @Injectable()
// export class JobsService {
//   constructor(/*...*/) {}

//   async sendMailWithCron(dateAndTime: Date, jobDto: JobsDto): Promise<void> {
//     try {
//       const cronExpression = this.generateCronExpression(dateAndTime);
//       // Usar la función sendMail con los datos del jobDto y la expresión cron
//       await this.sendMail(jobDto.email, jobDto.name, jobDto.asunto, jobDto.contenido, cronExpression);
//     } catch (error) {
//       throw new Error('Error sending email with cron.');
//     }
//   }

//   private generateCronExpression(dateAndTime: Date): string {
//     const parsedDate = new Date(dateAndTime); // Convertir la fecha proporcionada a un objeto Date
//     // Aquí podrías implementar la lógica para generar la expresión cron basada en parsedDate
//     // Por ejemplo, utilizando cron-parser o construyendo manualmente la expresión según parsedDate

//     // Ejemplo de generación de expresión cron con cron-parser (envío cada día a las 8 AM):
//     const cronExpression = '0 8 * * *'; // Reemplazar con tu lógica

//     return cronExpression;
//   }

//   async sendMail(to: string, from: string, subject: string, content: string, cron: string): Promise<any> {
//     // Lógica para enviar el correo utilizando los datos del job y la expresión cron
//   }
// }
// Luego, desde tu controlador, podrías llamar a este método sendMailWithCron pasándole la fecha y hora proporcionadas por el usuario y los datos del JobsDto.

// typescript
// Copy code
// import { Controller, Post, Body } from '@nestjs/common';
// import { JobsService } from '../services/jobs.service';
// import { JobsDto } from '../dto/jobs.dto';

// @Controller('jobs')
// export class JobsController {
//   constructor(private readonly jobsService: JobsService) {}

//   @Post('schedule-email')
//   async scheduleEmail(@Body() jobDto: JobsDto): Promise<any> {
//     const dateAndTime = new Date(jobDto.cron); // Suponiendo que el usuario proporciona una fecha y hora válidas
//     await this.jobsService.sendMailWithCron(dateAndTime, jobDto);
//     return { message: 'Email scheduled successfully!' };
//   }
// }
// Recuerda que debes adaptar la lógica de generación de expresiones cron en generateCronExpression según las necesidades específicas de tu aplicación. Esta implementación es solo un ejemplo básico para mostrar cómo podrías estructurar el código para manejar el cron basado en la fecha proporcionada por el usuario.