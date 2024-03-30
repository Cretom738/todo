import { Request, Response } from "express";
import { Task } from "../entities/task.entity";
import { CreateTaskDto, UpdateTaskDto } from "../libs/types/task.type";
import { TaskService } from "../services/task.service";

export class TaskController {
    
    constructor(
        private readonly taskService: TaskService
    ) {
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const { title, description, status } = req.body;
        const newTask: Task = await this.taskService.createTask(new CreateTaskDto(title, description, status));
        res.status(201).json({
            id: newTask.id,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status
        })
    }

    async getTasks(req: Request, res: Response): Promise<void> {
        const tasks: Task[] = await this.taskService.getTasks();
        res.status(200).json(tasks);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const task: Task = await this.taskService.getTaskById(+req.params.id);
        res.status(200).json(task);
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const { title, description, status } = req.body;
        const task: Task = await this.taskService.updateTask(+req.params.id, new UpdateTaskDto(title, description, status));
        res.status(200).json({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status
        }); 
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        await this.taskService.deleteTask(+req.params.id);
        res.status(204).json();
    }
}