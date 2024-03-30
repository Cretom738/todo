import express from 'express';
import "dotenv/config";
import "express-async-errors";
import { dbConnection } from './config/db.config';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { errorHandler } from './libs/middleware/error-handler.middleware';
import { NotFoundError } from './libs/errors/not-found.error';

const app = express();
const port = process.env.PORT;

dbConnection();

app.use(express.json());

const taskController = new TaskController(new TaskService());
app.post("/tasks", taskController.createTask.bind(taskController));
app.get("/tasks", taskController.getTasks.bind(taskController));
app.get("/tasks/:id", taskController.getById.bind(taskController));
app.patch("/tasks/:id", taskController.updateTask.bind(taskController));
app.delete("/tasks/:id", taskController.deleteTask.bind(taskController));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.all("*", async () => {
    throw new NotFoundError();
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app is running on ${process.env.ENV} and listening on port ${port}`);
});