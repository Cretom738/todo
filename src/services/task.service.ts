import { Request, Response } from "express";
import { Task } from "../entities/task.entity";
import { CreateTaskDto, TaskDto, UpdateTaskDto } from "../libs/types/task.type";
import { DataSource } from "typeorm";
import { NotFoundError } from "../errors/not-found.error";

export class TaskService {

    async createTask({ title, status, description }: CreateTaskDto): Promise<Task> {
       const newTask: Task = Task.create({
            title,
            description,
            status
        });
       return await newTask.save();
    }

    async getTasks(): Promise<Task[]> {
        return await Task.find({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    status: true
                }
            });
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await Task.findOne({
                where: {
                    id
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    status: true
                }
            });
        if (!task) {
            throw new NotFoundError();
        }
        return task;
    }

    async updateTask(id: number, { title, description, status }: UpdateTaskDto): Promise<Task> {
        const task: Task = await this.getTaskById(id);
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        return await task.save();
    }

    async deleteTask(id: number): Promise<void> {
        const task: Task = await this.getTaskById(id);
        await task.remove();
    }
} 