import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Task } from "./task.entity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ 
        length: 200,
        unique: true
    })
    name: string;

    @Column({ 
        length: 200,
        unique: true 
    })
    email: string;

    @Column({ length: 200 })
    password: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
