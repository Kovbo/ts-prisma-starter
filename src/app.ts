import express from "express";
import { tasksRouter } from "./router/tasksRouter";
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(tasksRouter);

app.listen(3000);
