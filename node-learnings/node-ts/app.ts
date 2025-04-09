import express, { Request, Response } from 'express';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const app = express();
const PORT = 3000;

app.use(express.json());

let todos: Todo[] = [];

app.post('/todos', (req: Request, res: Response): any => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

app.get('/todos', (req: Request, res: Response): any => {
  return res.json(todos);
});

app.get('/todos/:id', (req: Request, res: Response): any => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  return res.json(todo);
});

app.put('/todos/:id', (req: Request, res: Response): any => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title) todo.title = title;
  if (typeof completed === 'boolean') todo.completed = completed;

  return res.json(todo);
});

app.delete('/todos/:id', (req: Request, res: Response): any => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
