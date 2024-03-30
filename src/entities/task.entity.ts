import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"
import { ETaskStatus } from "../libs/types/task.type";

@Entity("tasks")
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: ETaskStatus
    })
    status: ETaskStatus;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}