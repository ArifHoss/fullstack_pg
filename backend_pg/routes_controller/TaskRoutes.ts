import { Router, Request, Response } from 'express';
import Task from '../models/Task';

const router = Router();

//GET all tasks
router.get('/', async (request: Request, response: Response) => {
    const tasks = await Task.findAll({ where: { archived: false } });
    response.json(tasks);
});

//GET archived
router.get('/archived', async (request: Request, response: Response) => {
    const tasks = await Task.findAll({ where: { archived: true } });
    response.json(tasks);
});

// GET task by ID
router.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            response.status(404).json({ error: 'Task not found' });
            return;
        }

        response.status(200).json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        response.status(500).json({ error: 'Internal server error' });
    } finally {
        console.log(`GET /tasks/${id} completed`);
    }
});

//POST new task
router.post('/', async (request: Request, response: Response) => {
    const { title } = request.body;
    const newTask = await Task.create({
        title,
        completed: false,
        archived: false
    });
    response.status(201).json(newTask);
});

//PUT new task
router.put('/completed/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, completed, archived } = req.body;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        task.set({ title, completed, archived });
        await task.save();

        res.json(task);
    } catch (error) {
        console.error(`Error updating task with id ${id}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        console.log(`PUT /tasks/${id} completed`);
    }
});

// Update

router.put('/edit/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const { title } = request.body;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            response.status(404).json({ error: 'Task not found' });
            return;
        }
        task.set({ title });
        await task.save();
        response.status(201).json(task);
    } catch (error) {
        console.error('Editing error:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});
// PUT /tasks/archive/:id
router.put('/archive/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);

        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        task.set({ archived: true });
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        console.error('Archive error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a task
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
        return console.log('Can not find task!');
    }

    await task.destroy();
    res.status(204).send();
});

export default router;
