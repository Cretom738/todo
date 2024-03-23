import express from 'express';
import "dotenv/config";
import { dbConnection } from './config/db.config';

const app = express();
const port = process.env.PORT;

dbConnection();

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`app is running on ${process.env.ENV} and listening on port ${port}`);
});