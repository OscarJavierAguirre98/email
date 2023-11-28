import { Controller, Param, Body, Get, Delete, Put, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JobsService } from '../services/jobs.service';
import { JobResponseDto, JobsDto, jobEntityWithHistorialEntity } from '../dto/jobs.dto';
import { UpdateJobDto } from '../dto/jobs.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
    constructor(
        private readonly iJobsService: JobsService) { }

    @ApiOperation({
        description: 'Get all jobs',
    })
    @Get()
    async getAllJobs() {
        return await this.iJobsService.getAllJobs();
    }

    @ApiOperation({
        description: 'Get job by Id',
    })
    @Get(':id')
    async getJobById(@Param('id') id: string) {
        return await this.iJobsService.getJobdById(id);
    }

    @ApiOperation({
        description: 'Create a new job',
    })
    @Post()
    async createJob(@Body() jobDto: JobsDto): Promise<jobEntityWithHistorialEntity> {
        const savedJob = await this.iJobsService.save(jobDto);
        console.log(jobDto);
        return savedJob;
    }

    @ApiOperation({
        description: 'Update job by Id',
    })
    @Post(':id')
    async updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto,) {
        return await this.iJobsService.updateJob(id,updateJobDto)
    }

    @ApiOperation({
        description: 'Delete job by Id'
    })
    @Delete(':id')
    async deleteJob(@Param('id') id: string) {
        return await this.iJobsService.deleteJob(id)
    }

//     @ApiOperation({
//         description: 'Send Emails'
//     })
//     @Post('cron-Email')
//     async scheduleEmail(@Body() jobDto: JobsDto): Promise<any> {
//         await this.iJobsService.cronAndEmail(jobDto, );
//         return { message: 'Email scheduled successfully!' };
//     }
}
