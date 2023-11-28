import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { HistorialJobsService } from '../services/historial_jobs.service';
import { HistorialJobDto } from '../dto/historial_jobs';
import { UpdateHistorialJobDto } from '../dto/historial_jobs';

@ApiTags('historial-jobs')
@Controller('historial-jobs')
export class HistorialJobsController {
    constructor (private readonly iHistorialJobsService: HistorialJobsService ) {}

    @ApiProperty({
        description: 'Get all hostorials',
    })
    @Get()
    async getAllHistorials() {
        return await this.iHistorialJobsService.getAllHistorial();
    }

    @ApiProperty({
        description: 'Get historial by Id',
    })
    @Get(':id')
    async getHistorialById(@Param('id') id: string) {
        return await this.iHistorialJobsService.getHistorialdById(id);
    }

    @ApiProperty({
        description: 'Update Historial by Id',
    })
    @Post(':id')
    async updateHistorial(@Param('id') id: string, @Body() updateHistorialJobDto: UpdateHistorialJobDto,) {
        return await this.iHistorialJobsService.updateHistorial(id,updateHistorialJobDto)
    }

    @ApiProperty({
        description: 'Delete Historial by Id'
    })
    @Delete(':id')
    async deleteHistorial(@Param('id') id: string) {
        return await this.iHistorialJobsService.deleteHistorial(id)
    }
}

