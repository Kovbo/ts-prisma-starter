"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = __importDefault(require("express"));
const tasksController_1 = require("../controllers/tasksController");
const tasksRouter = express_1.default.Router();
exports.tasksRouter = tasksRouter;
tasksRouter.get("/api/v1/tasks", tasksController_1.getAllTasks);
tasksRouter.get("/api/v1/tasks/:id", tasksController_1.getTask);
tasksRouter.post("/api/v1/tasks", tasksController_1.createTask);
tasksRouter.patch("/api/v1/tasks/:id", tasksController_1.updateTask);
tasksRouter.delete("/api/v1/tasks/:id", tasksController_1.deleteTask);
