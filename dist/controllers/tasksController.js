"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getAllTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = 1;
    const user = yield prisma.user.findFirstOrThrow({
        where: { id: userId },
    });
    const tasks = yield prisma.task.findMany({
        where: {
            project: {
                user: user,
            },
        },
        include: {
            project: { include: { user: true } },
        },
    });
    res.status(200).json({ tasks: tasks });
});
exports.getAllTasks = getAllTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const task = yield prisma.task.findFirstOrThrow({
        where: {
            id: Number(id),
        },
    });
    res.json({ task: task });
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newTask = yield prisma.task.create({
        data: {
            name: name,
            projectId: 1,
        },
    });
    res.json({ task: newTask });
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, completed } = req.body;
    yield prisma.task.findFirstOrThrow({
        where: {
            id: Number(id),
        },
    });
    const updatedTask = yield prisma.task.update({
        where: {
            id: Number(id),
        },
        data: {
            name: name,
            completed: completed,
        },
    });
    res.json({ task: updatedTask });
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.task.delete({
        where: {
            id: Number(id),
        },
    });
    res.json({ msg: "Deleted!" });
});
exports.deleteTask = deleteTask;
