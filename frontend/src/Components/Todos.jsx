// src/components/Todos.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchTodos = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_TODO_API}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) navigate('/login');
        throw new Error(data.msg || 'Failed to load todos');
      }
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate('/login');
    else fetchTodos();
  }, []);

  const addTodo = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_TODO_API}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });
      const newTodo = await res.json();
      if (!res.ok) throw new Error(newTodo.msg || 'Failed to add todo');
      setTodos(prev => [...prev, newTodo]);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async id => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_TODO_API}/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !todo.completed })
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.msg || 'Update failed');
      setTodos(prev => prev.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async id => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_TODO_API}/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Delete failed');
      }
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Your Todos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={addTodo}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="New todo" />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id)}
              />
              {todo.text}
            </label>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/profile')}>Go to Profile</button>
      <button onClick={() => {
        localStorage.removeItem('token');
        navigate('/login');
      }}>Logout</button>
    </div>
  );
}
