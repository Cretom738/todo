import { dataSource } from "./orm.config";

export const dbConnection = async (): Promise<void> => {
    try {
        await dataSource.initialize();
        console.log("DB connected");
    } catch (error) {
        console.error(error);
    }
}