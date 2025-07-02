import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a valid task!');
      return;
    }

    const newTodo = {
      id: nextId,
      text: inputValue.trim(),
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
    setNextId(prevId => prevId + 1);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="main-title">
            <i className="fas fa-tasks"></i>
            My Todo App
          </h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <div className="add-todo-section">
          <h2 className="section-title">
            Create <span className="accent">New Task</span>
          </h2>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button onClick={addTodo} className="add-button">
              <i className="fas fa-plus"></i>
              Add Task
            </button>
          </div>
        </div>

        <div className="todos-section">
          <div className="section-header">
            <h2 className="section-title">
              My <span className="accent">Tasks</span>
            </h2>
            <div className="stats">
              <span className="stat-item">
                <i className="fas fa-list"></i>
                Total: {totalCount}
              </span>
              <span className="stat-item">
                <i className="fas fa-check-circle"></i>
                Completed: {completedCount}
              </span>
            </div>
          </div>

          {todos.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-clipboard-list"></i>
              <p>No tasks yet. Add one above to get started!</p>
            </div>
          ) : (
            <ul className="todos-list">
              {todos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                      id={`todo-${todo.id}`}
                    />
                    <label htmlFor={`todo-${todo.id}`} className="todo-label">
                      {todo.text}
                    </label>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                    title="Delete task"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;