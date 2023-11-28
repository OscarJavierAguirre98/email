import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { EmailService } from '../services/email.service';
import { EmailDto } from '../dto/email.dto';
import { UpdateEmailDto } from '../dto/email.dto';

@ApiTags('email')
@Controller('email')
export class EmailController {
    constructor (private readonly iEmailService: EmailService ) {}

    @ApiProperty({
        description: 'Get all emails',
    })
    @Get()
    async getAllEmails() {
        return await this.iEmailService.getAllEmails();
    }

    @ApiProperty({
        description: 'Get emial by Id',
    })
    @Get(':id')
    async getEmailById(@Param('id') id: string) {
        return await this.iEmailService.getEmaildById(id);
    }

    @ApiProperty({
        description: 'Create email'
    })
    @Post()
    async create(@Body() emailDto: EmailDto){
        return await this.iEmailService.create(emailDto)
    }

    @ApiProperty({
        description: 'Update email by Id',
    })
    @Post(':id')
    async updateJob(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto,) {
        return await this.iEmailService.updateEmail(id,updateEmailDto)
    }

    @ApiProperty({
        description: 'Delete email by Id'
    })
    @Delete(':id')
    async deleteJob(@Param('id') id: string) {
        return await this.iEmailService.deleteEmail(id)
    }
}
