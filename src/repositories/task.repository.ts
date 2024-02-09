import { ObjectId } from 'mongodb';
import TaskModel from '../models/task.model';
import connect from '../config/mongodb-connector';

const COLLECTION = "tasks";

async function getTask(id: ObjectId | string): Promise<TaskModel | null> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
 
    const db = await connect();
    const task = await db.collection(COLLECTION)
        .findOne({ _id: new ObjectId(id) });
 
    if (!task) return null;
 
    return new TaskModel(task.titulo, task.descricao, task.dataCriacao, task.tags, task.responsavel, task._id);
}

async function getTasks(): Promise<TaskModel[]> {
    const db = await connect();
    
    const tasks = await db.collection(COLLECTION)
        .find()
        .toArray();
 
    return tasks.map(task => new TaskModel(task.titulo, task.descricao, task.dataCriacao, task.tags, task.responsavel, task._id));
}

async function addTask(task: TaskModel): Promise<TaskModel> {
    if (!task.titulo || !task.descricao || !task.dataCriacao || !task.tags || !task.responsavel)
    throw new Error(`Invalid task.`);
 
    const db = await connect();
    const result = await db.collection(COLLECTION)
        .insertOne(task);
 
    task._id = result.insertedId;
    return task;
}

async function updateTask(id: string | ObjectId, task: TaskModel): Promise<TaskModel | null> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
 
    const db = await connect();
    await db.collection(COLLECTION)
        .updateOne({ _id: new ObjectId(id) }, { $set: task });
 
    return getTask(id);
}

async function deleteTask(id: any): Promise<boolean> {
    if (!ObjectId.isValid(id)) throw new Error(`Invalid id.`);
    
    const db = await connect();
    const result = await db.collection(COLLECTION)
        .deleteOne({ _id: new ObjectId(id) });
 
    return result.deletedCount > 0;
}

export default {
    getTask,
    getTasks,
    deleteTask,
    addTask,
    updateTask
}