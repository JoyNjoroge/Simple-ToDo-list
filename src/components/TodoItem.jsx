import React from "react"

function TodoItem({ task, onDeleteTask }) {
    return (
      <li className="flex justify-between bg-slate-700 p-2 rounded-lg">
        <span>{task.text}</span>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-red-400 hover:text-red-600"
        >
          ❌
        </button>
      </li>
    );
  }
  
  export default TodoItem;
  