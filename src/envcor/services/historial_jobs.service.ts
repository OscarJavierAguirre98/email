import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HistorialJobsEntity } from '../entities/historial_jobs.entity';
import { Repository } from 'typeorm';
import { HistorialJobDto } from '../dto/historial_jobs';
import { UpdateHistorialJobDto } from '../dto/historial_jobs';
import { HistorialJobEntityWithDto } from '../dto/historial_jobs';
import { JobEntity } from '../entities/jobs.entity';

@Injectable()
export class HistorialJobsService {
    constructor(@Inject("HISTORIAL_JOB_REPOSITORY")
    private readonly iHistorialJobsEntity: Repository<HistorialJobsEntity>,
    ) { }

    async getAllHistorial(): Promise<HistorialJobsEntity[]> {
        try {
            const historiales = await this.iHistorialJobsEntity.find();
            return historiales;
        } catch (error) {
            throw new InternalServerErrorException('Error getting historiales');
        }
    }

    async getHistorialdById(id: string): Promise<HistorialJobsEntity> {
        try {
            const historial = await this.iHistorialJobsEntity.findOne({
                where: {
                    id
                },
            });
            return historial;
        } catch (error) {
            throw new NotFoundException(`historial not found`);
        }
    }

    async getHistorialJobByJobId(jobId: string): Promise<HistorialJobsEntity> {
        const historialJob = await this.iHistorialJobsEntity.findOne({
            where: {
                job:
                {
                    id: jobId
                }
            }
        });

        if (!historialJob) {
            throw new NotFoundException(`Historial job with job not found`);
        }

        return historialJob;
    }

    async createHistorialJob(quantityEmailSended: number, quantityEmail: number, job: JobEntity): Promise<HistorialJobsEntity> {
        const historialJob = new HistorialJobsEntity();
        historialJob.quantityEmailSended = quantityEmailSended;
        historialJob.quantityEmail = quantityEmail;
        historialJob.job = job;
        const savedHistorialJob = await this.iHistorialJobsEntity.save(historialJob);
    
        return savedHistorialJob;
    }

    async updateHistorial(
        id: string,
        updateData: UpdateHistorialJobDto,
    ): Promise<HistorialJobsEntity> {
        try {
            const historial = await this.getHistorialdById(id);
            if (!historial) {
                throw new NotFoundException(`historial not found`);
            }
            Object.assign(historial, updateData);

            await this.iHistorialJobsEntity.save(historial);

            return historial;
        } catch (error) {
            throw new InternalServerErrorException(`Error updating email`);
        }
    }

    async updateHistorialJob(historialJob: HistorialJobsEntity): Promise<HistorialJobsEntity> {
        return await this.iHistorialJobsEntity.save(historialJob);
    }

    async deleteHistorial(id: string): Promise<HistorialJobsEntity> {
        try {
            const historial = await this.getHistorialdById(id);

            if (!historial) {
                throw new NotFoundException(`email not found`);
            }

            await this.iHistorialJobsEntity.softDelete(historial.id);

            return historial;
        } catch (error) {
            throw new InternalServerErrorException(`Error deleting email`);
        }
    }
}












// async save(currentUser: UserEntity, dto: HistorialCasoEntityWithDto, oCaso: CasoEntity): Promise<HistorialCasoEntity> {
//     await this.sendMail(oCaso.responsableModulo.responsable.emailNotificaciones, oCaso.solicitante.emailNotificaciones, currentUser.email, oCaso.numeroCaso, dto.comentarios)
//     return await this.iHistorialCasoRepository.save({
//         ...dto,
//         casoId: undefined,
//         caso: oCaso,
//         createdBy: currentUser,
//         updatedBy: currentUser,
//     });
// }
