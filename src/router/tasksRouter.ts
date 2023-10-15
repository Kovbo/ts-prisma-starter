import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/tasksController";
const tasksRouter = express.Router();

tasksRouter.get("/api/v1/tasks", getAllTasks);
tasksRouter.get("/api/v1/tasks/:id", getTask);
tasksRouter.post("/api/v1/tasks", createTask);
tasksRouter.patch("/api/v1/tasks/:id", updateTask);
tasksRouter.delete("/api/v1/tasks/:id", deleteTask);

export { tasksRouter };
