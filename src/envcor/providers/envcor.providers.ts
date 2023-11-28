import { DataSource } from "typeorm"
import { JobEntity } from "../entities/jobs.entity"
import { EmailEntity } from "../entities/email.entity"
import { HistorialJobsEntity } from "../entities/historial_jobs.entity"

export const envcorProvider= [
    {
		provide: "JOB_REPOSITORY",
		useFactory: (datasource: DataSource) => datasource.getRepository(JobEntity),
		inject: ["DATA_SOURCE"]
	},
    {
        provide: "EMAIL_REPOSITORY",
        useFactory: (datasource: DataSource) => datasource.getRepository(EmailEntity),
        inject: ["DATA_SOURCE"]
    },
    {
        provide: "HISTORIAL_JOB_REPOSITORY",
        useFactory: (datasource: DataSource) => datasource.getRepository(HistorialJobsEntity),
        inject: ["DATA_SOURCE"]
    },
]