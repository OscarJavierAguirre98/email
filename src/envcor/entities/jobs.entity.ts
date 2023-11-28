import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity({
    name: 'Jobs'
})
export class JobEntity {
    @PrimaryGeneratedColumn('uuid', {
        name: 'jobs_id'
    })
    id: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255
    })
    name: string;

    @Column({
        name: 'email',
        type: 'text',
    })
    email: string;

    @Column({
        name: 'asunto',
        type: 'varchar',
        length: 255
    })
    asunto: string;

    @Column({
        name: "contenido",
        type: 'text'
    })
    contenido: string;

    @Column({
        name: 'cron',
        type: 'varchar',
        length: 255
    })
    cron: string;
}

