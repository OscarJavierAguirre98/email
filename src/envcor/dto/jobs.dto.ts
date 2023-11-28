import {IsArray, IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger"
import { JobEntity } from "../entities/jobs.entity";
import { HistorialJobsEntity } from "../entities/historial_jobs.entity";


export class JobsDto {

    @ApiProperty()
	@MinLength(1)
	@MaxLength(255)
    @IsString()
	name: string;

	@ApiProperty()
	@IsEmail()
	email: string;

    @ApiProperty()
	@MinLength(1)
	@MaxLength(255)
	asunto: string;

    @ApiProperty()
	@MinLength(1)
	@MaxLength(255)
	contenido: string;

    @ApiProperty()
	@MinLength(1)
	@MaxLength(255)
	cron: string;
}

export class JobResponseDto extends JobsDto {
    totalEmailsSent: number;
    successfulEmails: number;
    lastEmailSentAt: Date;
}

export type JobEntityDto = Omit<JobEntity, "id">;

export type JobEntityWithDto = Partial<JobEntityDto> & Partial<JobsDto>;

export type jobEntityWithHistorialEntity = Partial<JobEntityDto> & Partial<HistorialJobsEntity>;

export class UpdateJobDto extends JobsDto {}