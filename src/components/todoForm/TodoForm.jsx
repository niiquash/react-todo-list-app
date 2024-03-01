import { useState } from "react";
import "./todoform.css";

const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    todoItem: "",
    completed: false,
  });
  const [completedTodo, setCompletedTodo] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, formData]);
    setFormData({ todoItem: "", completed: false });
  };

  const onMarkCompleted = (item) => {
    const updatedTodos = todos.map((todo) =>
      todo.todoItem === item ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (item) => {
    const filteredTodos = todos.filter((todo) => todo.todoItem !== item);
    setTodos(filteredTodos);
  };

  console.log(todos);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoItem">Todo:</label>
        <input
          type="text"
          name="todoItem"
          onChange={handleInputChange}
          value={formData.todoItem}
        />

        <button className="submit-btn" type="submit">
          Add item
        </button>
      </form>
      <section className="list-display">
        <ul>
          {todos.length > 0 ? (
            todos.map((todo, idx) => (
              <li key={idx}>
                {todo.todoItem}
                <div>
                  <button
                    className="mark-complete-btn"
                    onClick={() => onMarkCompleted(todo.todoItem)}
                  >
                    {todo.completed === false ? "completed" : "incomplete"}
                  </button>
                  {todo.completed && (
                    <button
                      className="mark-delete-btn"
                      onClick={() => handleDelete(todo.todoItem)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No todos to display</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default TodoForm;
