import express from 'express';
import "dotenv/config";
import { dbConnection } from './config/db.config';
import { TaskController } from './controllers/task.controller';
import { dataSource } from './config/orm.config';

const app = express();
const port = process.env.PORT;

dbConnection();

app.use(express.json());

const taskController = new TaskController(dataSource);
app.get("/tasks/:id", taskController.getById.bind(taskController));
app.post("/tasks", taskController.post.bind(taskController));
app.put("/tasks/:id", taskController.put.bind(taskController));
app.delete("/tasks/:id", taskController.delete.bind(taskController));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`app is running on ${process.env.ENV} and listening on port ${port}`);
});