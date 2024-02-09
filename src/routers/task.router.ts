import express from 'express';
import taskController from '../controllers/task.controller';

const router = express.Router();

router.get('/:id', taskController.getTask);

router.get('/', taskController.getTasks);

router.post('/', taskController.postTask);

router.patch('/:id', taskController.patchTask);

router.delete('/:id', taskController.deleteTask);

export default router;