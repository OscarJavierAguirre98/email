import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JobEntity } from '../entities/jobs.entity';
import { Repository } from 'typeorm';
import { JobsDto, jobEntityWithHistorialEntity } from '../dto/jobs.dto';
import { UpdateJobDto } from '../dto/jobs.dto';
import { JobEntityWithDto } from '../dto/jobs.dto';
import * as nodemailer from 'nodemailer';
import { Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { HistorialJobsService } from './historial_jobs.service';

@Injectable()
export class JobsService {
    constructor(@Inject("JOB_REPOSITORY")
    private readonly iJobEntity: Repository<JobEntity>,
        private readonly iHistorialJobsService: HistorialJobsService,
    ) { }

    async getAllJobs(): Promise<JobEntity[]> {
        try {
            const jobs = await this.iJobEntity.find();
            // Si se obtienen los jobs correctamente
            return jobs;
        } catch (error) {
            // Si ocurre cualquier error durante la ejecución, lanza una InternalServerErrorException
            throw new InternalServerErrorException('Error getting jobs');
        }
    }

    async getJobdById(id: string): Promise<JobEntity> {
        try {
            // Intenta obtener el Job por su ID
            const job = await this.iJobEntity.findOne({
                where: {
                    id
                },
            });
            // Si el job se encuentra, devuélvelo
            return job;
        } catch (error) {
            // Si ocurre cualquier error durante la ejecución lanza una NotFoundException
            throw new NotFoundException(`Job not found`);
        }
    }

    async save(dto: jobEntityWithHistorialEntity): Promise<JobEntity> {

        const oData = await this.iJobEntity.save({
            ...(await this.getDataDto(dto)),
        })
        await this.cronAndEmail(dto, oData)
        return oData;
    }

    async updateJob(
        id: string,
        updateData: UpdateJobDto,
    ): Promise<JobEntity> {
        try {
            const job = await this.getJobdById(id);

            // Si el job no se encuentra, lanza una NotFoundException
            if (!job) {
                throw new NotFoundException(`job not found`);
            }

            // Asignar los campos del DTO al worker
            Object.assign(job, updateData);

            // Intenta guardar el worker actualizado
            await this.iJobEntity.save(job);

            // Si el worker se guarda correctamente, devuélvelo
            return job;
        } catch (error) {
            // Si ocurre cualquier otro error durante la ejecución lanza una InternalServerErrorException
            throw new InternalServerErrorException(`Error updating job`);
        }
    }

    async deleteJob(id: string): Promise<JobEntity> {
        try {
            const job = await this.getJobdById(id);

            // Si el job no se encuentra, lanza una NotFoundException
            if (!job) {
                throw new NotFoundException(`job not found`);
            }

            await this.iJobEntity.softDelete(job.id);

            // Si el job se elimina correctamente, devuélvelo
            return job;
        } catch (error) {
            // Si ocurre cualquier otro error durante la ejecución lanza una InternalServerErrorException
            throw new InternalServerErrorException(`Error deleting job`);
        }
    }

    private getEmailConnection() {
        return nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            auth: {
                user: 'notificaciones@newsol.com.co',
                pass: 'komnid-vofqi9-fUmjog',
            }
        });
    }

    sendMail(to: string[], from: string, asunto: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const isDevEnvironment = process.env.NODE_ENV === 'dev';

            return this.getEmailConnection().sendMail({
                to: to,
                from: process.env.API_EMAIL_NOTIFICATIONS,
                subject: asunto,
            }, (oError, oInfo) => {
                if (oError) {
                    return reject(oError);
                } else {
                    resolve(oInfo.accepted.length);
                }
            });
        })
    }

    async cronAndEmail(dto: jobEntityWithHistorialEntity, job: JobEntity): Promise<void> {
        const { email, asunto, cron } = job;

        const emailAddresses = email.split(/,\s*/);

        const startCron = new CronJob(cron, async () => {
            let successfulEmails = 0;
            let totalEmails = emailAddresses.length;
            try {
                successfulEmails = await this.sendMail(emailAddresses, email, asunto);
            } catch (error) {
                console.error('Error sending email:', error);
            }

            await this.iHistorialJobsService.createHistorialJob(successfulEmails, totalEmails, job);
        });
        startCron.start();
    }

    async getDataDto(job: jobEntityWithHistorialEntity): Promise<JobsDto> {
        const { name, email, asunto, contenido, cron } = job;

        const dto = new JobsDto();
        dto.name = name;
        dto.email = JSON.stringify(email);
        dto.asunto = asunto;
        dto.contenido = contenido;
        dto.cron = cron;
        return dto;
    }
}




