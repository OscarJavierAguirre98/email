import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EmailEntity } from '../entities/email.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { EmailDto } from '../dto/email.dto';
import { UpdateEmailDto } from '../dto/email.dto';

@Injectable()
export class EmailService {
    constructor(@Inject("EMAIL_REPOSITORY")
    private readonly iEmailEntity: Repository<EmailEntity>,
    ) { }


    async getAllEmails(): Promise<EmailEntity[]> {
        try {
            const emails = await this.iEmailEntity.find();
            return emails;
        } catch (error) {
            throw new InternalServerErrorException('Error getting emails');
        }
    }

    async getEmaildById(id: string): Promise<EmailEntity> {
        try {
            const email = await this.iEmailEntity.findOne({
                where: {
                    id
                },
            });
            return email;
        } catch (error) {
            throw new NotFoundException(`email not found`);
        }
    }

    async create(dto: EmailDto): Promise<EmailEntity> {
        const newEmail = this.iEmailEntity.create(dto);
        return await this.iEmailEntity.save(newEmail);
    }

    async updateEmail(
        id: string,
        updateData: UpdateEmailDto,
    ): Promise<EmailEntity> {
        try {
            const email = await this.getEmaildById(id);
            if (!email) {
                throw new NotFoundException(`email not found`);
            }
            Object.assign(email, updateData);

            await this.iEmailEntity.save(email);

            return email;
        } catch (error) {
            throw new InternalServerErrorException(`Error updating email`);
        }
    }

    async deleteEmail(id: string): Promise<EmailEntity> {
        try {
            const email = await this.getEmaildById(id);

            if (!email) {
                throw new NotFoundException(`email not found`);
            }

            await this.iEmailEntity.softDelete(email.id);

            return email;
        } catch (error) {
            throw new InternalServerErrorException(`Error deleting email`);
        }
    }
}
