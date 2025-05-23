import { useState } from 'react';
import api from '../api';

export default function Signup({ setStage }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signup = async () => {
    try {
      await api.post('/auth/signup', { userId, password });
      setStage('login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">Signup</h2>

      <input
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={signup}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Signup
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={() => setStage('login')}
        className="w-full text-sm text-blue-600 hover:underline"
      >
        Go to Login
      </button>
    </div>
  );
}
