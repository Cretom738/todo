export enum ETaskStatus {

    TODO = "To do",
    IN_PROGRESS = "In progress",
    COMPLETED = "Completed"
}

export class CreateTaskDto {

    title: string;
    description: string;
    status: ETaskStatus;

    constructor(title: string, description: string, status: ETaskStatus) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

export class UpdateTaskDto {

    title: string;
    description: string;
    status: ETaskStatus;

    constructor(title: string, description: string, status: ETaskStatus) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

export class TaskDto {

    id: number;
    title: string;
    description: string;
    status: ETaskStatus;
    userId: number;
}