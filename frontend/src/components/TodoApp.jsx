import { useEffect, useState } from 'react';
import api from '../api';

export default function TodoApp({ userId, setStage }) {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await api.get(`/todos/${userId}`);
      setTodos(res.data);
      setError('');
    } catch {
      setError('Failed to fetch todos');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const res = await api.post('/todos', { userId, task });
      setTodos([...todos, res.data]);
      setTask('');
      setError('');
    } catch {
      setError('Failed to add todo');
    }
  };

  const toggleComplete = async (id) => {
    try {
      const res = await api.put(`/todos/toggle/${id}`);
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setError('');
    } catch {
      setError('Failed to toggle todo');
    }
  };

  const removeTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError('');
    } catch {
      setError('Failed to remove todo');
    }
  };

  const startEdit = (id, currentTask) => {
    setEditingId(id);
    setEditTask(currentTask);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTask('');
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/todos/${id}`, { task: editTask });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      cancelEdit();
      setError('');
    } catch {
      setError('Failed to edit todo');
    }
  };

  const logout = () => {
    setStage('login');
  };

  return (
    <div className="p-24 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">{userId}'s Todo List</h2>

      <div className="flex mb-6 space-x-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo();
          }}
          placeholder="Enter task"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addTodo}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <ul className="space-y-3 mb-8">
        {todos.map(({ _id, task, completed }) => (
          <li
            key={_id}
            className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md shadow-sm"
          >
            <div
              onClick={() => toggleComplete(_id)}
              title={completed ? 'Mark as incomplete' : 'Mark as complete'}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                completed ? 'bg-green-500 border-green-700' : 'bg-white border-gray-700'
              }`}
            />
            {editingId === _id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => saveEdit(_id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-grow ${
                    completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task}
                </span>
                <button
                  onClick={() => startEdit(_id, task)}
                  disabled={completed}
                  title={completed ? "Can't edit completed task" : 'Edit task'}
                  className={`px-3 py-1 rounded ${
                    completed
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer'
                  } transition`}
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTodo(_id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="flex justify-center">
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
