import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
    }).compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


// async scheduleEmail(jobDto: JobsDto): Promise<void> {
//   const { to, from, contenido, cron } = jobDto;

//   // Programar la función sendMail con la expresión cron proporcionada en el DTO
//   const scheduledEmail = new CronJob(cron, async () => {
//     try {
//       // Enviar el correo electrónico cuando se dispare la expresión cron
//       await this.sendMail(to, from, contenido);
//       scheduledEmail.stop(); // Detener la tarea después de enviar el correo
//     } catch (error) {
//       // Manejar cualquier error que ocurra al enviar el correo
//       console.error('Error sending scheduled email:', error);
//     }
//   });

//   scheduledEmail.start(); // Iniciar la tarea programada
// }

// private async sendMail(to: string, from: string, contenido: string): Promise<void> {
//   const isDevEnvironment = process.env.NODE_ENV === 'dev';
//   // Establecer el correo responsable según el entorno
//   if (isDevEnvironment) {
//     to = 'oscar.aguirre@newsol.com.co'; // Correo para entorno dev
//   }

//   await this.emailTransporter.sendMail({
//     to,
//     from,
//     subject: `Tenemos la siguiente información ${contenido}`,
//   });
// }
// }