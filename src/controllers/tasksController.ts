import { PrismaClient, Task } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllTasks = async (req: Request, res: Response) => {
  const userId = 1;

  const user = await prisma.user.findFirstOrThrow({
    where: { id: userId },
  });

  const tasks = await prisma.task.findMany({
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
};
const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });

  res.json({ task: task });
};

const createTask = async (req: Request, res: Response) => {
  const { name } = req.body as Task;

  const newTask = await prisma.task.create({
    data: {
      name: name,
      projectId: 1,
    },
  });

  res.json({ task: newTask });
};
const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, completed } = req.body as Task;

  await prisma.task.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });

  const updatedTask = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      completed: completed,
    },
  });

  res.json({ task: updatedTask });
};
const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({ msg: "Deleted!" });
};

export { getAllTasks, getTask, createTask, updateTask, deleteTask };
