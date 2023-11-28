import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { JobEntity } from "./jobs.entity";
import { HistorialJobsEntity } from "./historial_jobs.entity";

@Entity({
    name: 'emails'
})
export class EmailEntity {
    @PrimaryGeneratedColumn('uuid',{
        name: 'emails_id'
    })
    id: string;

    @Column({
        name: 'estado',
        type: 'boolean'
    })
    estado: boolean; 

    @ManyToOne(() => JobEntity, {
		nullable: false,
		eager: false,
	})
	@JoinColumn({
		name: "jobs"
	})
	jobs: JobEntity;

    @ManyToOne(() => HistorialJobsEntity, {
		nullable: false,
		eager: false,
	})
	@JoinColumn({
		name: "Historial_jobs"
	})
	historialJobsEntity: HistorialJobsEntity;
}

