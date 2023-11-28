import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn } from "typeorm"
import { EmailEntity } from "./email.entity";
import { JobEntity } from "./jobs.entity";

@Entity({
    name: "historial_jobs"
})
export class HistorialJobsEntity {
    @PrimaryGeneratedColumn('uuid', {
        name: 'historial_jobs_id'
    })
    id: string;

    @Column({
        name: 'Quantity_email_sended',
        type: 'int',
        default: 0
    })
    quantityEmailSended: number;

    @Column({
        name: 'quantity_email',
        type: 'int',
        default: 0
    })
    quantityEmail: number

    @CreateDateColumn({ 
        name: 'created_at',
        type: 'timestamp' 
    })
    createdAt: Date;

    // @ManyToMany(() => EmailEntity,
    //     (emailEntity: EmailEntity) => emailEntity, {
    //     nullable: false,
    //     eager: true
    // })
    // @JoinTable({
    //     name: "email_with_historial"
    // })
    // email: EmailEntity[];

    @ManyToOne(() => JobEntity, {
		nullable: false,
		eager: true,
	})
	@JoinColumn({
		name: "job_id"
	})
	job: JobEntity;
}