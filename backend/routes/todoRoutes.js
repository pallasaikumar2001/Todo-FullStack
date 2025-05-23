const express = require('express');
const {
  getTodos,
  addTodo,
  removeTodo,
  editTodo,
  toggleComplete, // ✅ Add this import
} = require('../controllers/todoController');

const router = express.Router();

router.get('/:userId', getTodos);
router.post('/', addTodo);
router.delete('/:id', removeTodo);
router.put('/:id', editTodo);
router.put('/toggle/:id', toggleComplete); // ✅ New route for toggling task completion

module.exports = router;
