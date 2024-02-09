import TaskModel from './../models/task.model';
import { Request, Response, NextFunction } from 'express';

import taskRepository from '../repositories/task.repository';

async function getTask(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const task = await taskRepository.getTask(id);
    if (task)
        res.json(task);
    else
        res.sendStatus(404);
}

async function getTasks(req: Request, res: Response, next: NextFunction) {
    const tasks = await  taskRepository.getTasks();
    res.json(tasks);
}

async function postTask(req: Request, res: Response, next: NextFunction) {
    const task = req.body as TaskModel;
    const result = await  taskRepository.addTask(task);
    if (result)
        res.status(201).json(result);
    else
        res.sendStatus(400);
}

async function patchTask(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const task = req.body as TaskModel;
    const result = await  taskRepository.updateTask(id, task);
    if (result)
        res.json(result);
    else
        res.sendStatus(404);
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const success = await  taskRepository.deleteTask(id);
    if (success)
        res.sendStatus(204);
    else
        res.sendStatus(404);
}

export default {
    getTask,
    getTasks,
    postTask,
    patchTask,
    deleteTask
}