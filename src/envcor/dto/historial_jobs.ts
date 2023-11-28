import {MaxLength, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger"
import { HistorialJobsEntity } from "../entities/historial_jobs.entity";

export class HistorialJobDto {
	
	@ApiProperty()
	@MinLength(1)
	@MaxLength(36)
	jobId: string;

	// @ApiProperty()
	// @MinLength(1)
	// @MaxLength(36)
	// emailId: string;
}

export class UpdateHistorialJobDto extends HistorialJobDto {}

export type HistorialJobEntityDto = Omit<HistorialJobsEntity, "id">

export type HistorialJobEntityWithDto = Partial<HistorialJobEntityDto> & Partial<HistorialJobDto>



