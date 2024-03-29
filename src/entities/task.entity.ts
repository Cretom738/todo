import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ETaskStatus } from "../libs/types/task.type";
import { User } from "./user.entity";

@Entity("tasks")
export class Task {

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

    @Column({ 
        name: "user_id",
        type: "int"
    })
    userId: number;

    @ManyToOne(() => User, {
        cascade: true,
    })
    @JoinColumn({ name: "user_id" })
    user: User;
}