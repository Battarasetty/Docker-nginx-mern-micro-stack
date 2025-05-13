import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todoController.js';


const router = express.Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
