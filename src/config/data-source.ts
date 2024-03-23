import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";
import { join } from "path";

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT!,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: ["../entities/*.entity.{js,ts}"],
    migrations: ["../migrations/*.{ts,js}"],
    migrationsTableName: "migrations"
});
/*
export const dbConnection = async (): Promise<void> => {
    try {
        await appDataSource.initialize();
        console.log("DB connected");
    } catch (error) {
        console.error(error);
    }
}
*/