import { useState } from 'react';
import api from '../api';

export default function Login({ setStage, setUserId }) {
  const [userId, setUserIdLocal] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      await api.post('/auth/login', { userId, password });
      setUserId(userId);
      setStage('todo');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserIdLocal(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={login}
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
      >
        Login
      </button>

      <button
        onClick={() => setStage('signup')}
        className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition"
      >
        Go to Signup
      </button>
    </div>
  );
}
