import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import helmet from "helmet";
import morgan from "morgan";
import taskRouter from './routers/task.router';
import "reflect-metadata";

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/tasks/', taskRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
});

export default app;