export enum ETaskStatus {

    TODO = "To do",
    IN_PROGRESS = "In progress",
    COMPLETED = "Completed"
}

export class TaskCreateDto {

    title: string;
    description: string;
    status: ETaskStatus;

    static [Symbol.hasInstance](dto: any): dto is TaskUpdateDto {
        return dto.title != null
            && dto.description != null
            && dto.status != null
            && Object.values(ETaskStatus).includes(dto.status ?? null);
    }
}

export class TaskUpdateDto {

    title: string;
    description: string;
    status: ETaskStatus;

    static [Symbol.hasInstance](dto: any): dto is TaskCreateDto {
        return dto.title != null
            && dto.description != null
            && dto.status != null
            && Object.values(ETaskStatus).includes(dto.status ?? null);
    }
}

export class TaskDto {

    id: number;
    title: string;
    description: string;
    status: ETaskStatus;
    userId: number;
}