import { MinLength, MaxLength, IsString  } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class EmailDto {
    
	@ApiProperty()
	estado: boolean;

    @ApiProperty()
	@MinLength(1)
	@MaxLength(36)
	jobId: string;

    @ApiProperty()
	@MinLength(1)
	@MaxLength(36)
	historialCasoId: string;
}

export class UpdateEmailDto extends EmailDto {}