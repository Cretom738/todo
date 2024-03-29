import { Request, Response } from "express";
import { Task } from "../entities/task.entity";
import { ETaskStatus, TaskCreateDto, TaskDto, TaskUpdateDto } from "../libs/types/task.type";
import { DataSource } from "typeorm";

export class TaskController {
    
    constructor(
        private readonly _dataSource: DataSource
    ) {
    }

    async getById(request: Request, response: Response): Promise<void> {
        const taskId: number = Number(request.params.id);
        if (taskId < 1) {
            response.sendStatus(400);
            return;
        }
        const fetchedTask: Task | null = await this._dataSource
            .getRepository(Task)
            .findOneBy({
                id: taskId
            });
        if (fetchedTask == null) {
            response.sendStatus(404);
            return;
        }
        const resultDto: TaskDto = new TaskDto();
        resultDto.id = fetchedTask.id;
        resultDto.title = fetchedTask.title;
        resultDto.description = fetchedTask.description;
        resultDto.status = fetchedTask.status;
        resultDto.userId = fetchedTask.userId;
        response
            .status(200)
            .json(resultDto);
    }

    async post(request: Request, response: Response): Promise<void> {
        let dto = request.body;
        if (!(dto instanceof TaskCreateDto)) {
            response.sendStatus(400);
            return;
        }
        const newTask: Task = new Task();
        newTask.title = dto.title;
        newTask.description = dto.description;
        newTask.status = dto.status;
        newTask.userId = 1; //hard-coded
        await this._dataSource
            .getRepository(Task)
            .save(newTask);
        const resultDto: TaskDto = new TaskDto();
        resultDto.id = newTask.id;
        resultDto.title = newTask.title;
        resultDto.description = newTask.description;
        resultDto.status = newTask.status;
        resultDto.userId = newTask.userId;
        response
            .status(201)
            .location(`/tasks/${newTask.id}`)
            .json(resultDto);
    }

    async put(request: Request, response: Response): Promise<void> {
        const taskId: number = Number(request.params.id);
        let dto = request.body;
        if (taskId < 1
            || !(dto instanceof TaskUpdateDto)) {
            response.sendStatus(400);
            return;
        }
        const fetchedTask: Task | null = await this._dataSource
            .getRepository(Task)
            .findOneBy({
                id: taskId
            });
        if (fetchedTask == null) {
            response.sendStatus(404);
            return;
        }
        fetchedTask.title = dto.title;
        fetchedTask.description = dto.description;
        fetchedTask.status = dto.status;
        await this._dataSource
            .getRepository(Task)
            .save(fetchedTask);
        const resultDto: TaskDto = new TaskDto();
        resultDto.id = fetchedTask.id;
        resultDto.title = fetchedTask.title;
        resultDto.description = fetchedTask.description;
        resultDto.status = fetchedTask.status;
        resultDto.userId = fetchedTask.userId;
        response
            .status(200)
            .json(resultDto);
    }

    async delete(request: Request, response: Response): Promise<void> {
        const taskId: number = Number(request.params.id);
        if (taskId < 1) {
            response.sendStatus(400);
            return;
        }
        const fetchedTask: Task | null = await this._dataSource
            .getRepository(Task)
            .findOneBy({
                id: taskId
            });
        if (fetchedTask == null) {
            response.sendStatus(404);
            return;
        }
        await this._dataSource
            .getRepository(Task)
            .remove(fetchedTask);
        response.sendStatus(200);
    }
}