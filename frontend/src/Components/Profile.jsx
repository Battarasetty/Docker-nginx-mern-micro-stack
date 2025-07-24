// src/components/Profile.js
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_PROFILE_API}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const { todos } = await res.json();
        setTodos(todos);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Could not load todos.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <div>Loading your todos…</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Your Todos (via Profile Service)</h2>
      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo._id}>
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />{' '}
                {todo.text}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
