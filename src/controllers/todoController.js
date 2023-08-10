const Todo = require('../models/Todo');

const todoController = {
  async getTodos(req, res) {
    try {
      const todos = await Todo.findAll();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createTodo(req, res) {
    const { name, duration } = req.body;

    try {
      const newTodo = await Todo.create({ name, duration });
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(400).json({ error: 'Bad request' });
    }
  },

  async getTodoById(req, res) {
    const todoId = req.params.id;
    try {
      const todo = await Todo.findByPk(todoId);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateTodo(req, res) {
    const todoId = req.params.id;
    const { name, duration } = req.body;
    try {
      const [updatedRowsCount, updatedTodo] = await Todo.update(
        { name, duration },
        { where: { id: todoId }, returning: true }
      );
      if (updatedRowsCount > 0) {
        res.json(updatedTodo[0]);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteTodo(req, res) {
    const todoId = req.params.id;
    try {
      const deletedRowsCount = await Todo.destroy({ where: { id: todoId } });
      if (deletedRowsCount > 0) {
        res.json({ message: 'Todo deleted' });
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = todoController;