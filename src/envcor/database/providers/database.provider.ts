import { DataSource } from "typeorm";
import { JobEntity } from "src/envcor/entities/jobs.entity";
import { EmailEntity } from "src/envcor/entities/email.entity";
import { HistorialJobsEntity } from "src/envcor/entities/historial_jobs.entity";

export const DatabaseProvider = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {

            const datasource = new DataSource({
                type: "mysql",
                host: 'localhost',
                port: 3306,
                username: 'envioCorreos',
                password: 'envioCorreos123',
                database: 'envioCorreos',
                entities: [JobEntity, EmailEntity, HistorialJobsEntity],
                synchronize: true
                // type: "mysql",
                // host: process.env.API_DATABASE_HOST,
                // port: 3306,
                // username: process.env.API_DATABASE_USER,
                // password: process.env.API_DATABASE_PASS,
                // database: process.env.API_DATABASE_SCHEMA,
                // entities: [JobEntity, EmailEntity, HistorialJobsEntity],
                // synchronize: true
            });
            return datasource.initialize();
        }
    }
];