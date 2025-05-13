import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const newTodo = new Todo({ text: req.body.text, user: req.user });
  await newTodo.save();
  res.status(201).json(newTodo);
};

export const updateTodo = async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ msg: 'Todo deleted' });
};
