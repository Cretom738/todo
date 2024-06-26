import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import "dotenv/config"

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT!,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    entities: [join(__dirname, "../entities/*.entity.{js,ts}")],
    migrations: [join(__dirname, "../migrations/*.{ts,js}")],
    migrationsTableName: "migrations"
});