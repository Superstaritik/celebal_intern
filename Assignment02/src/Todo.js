import React from "react";

const Todo = ({ todo, onDelete, onToggle }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
};

export default Todo;
