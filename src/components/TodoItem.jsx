import React from "react";

function TodoItem({ task, onDeleteTask, onToggleDone }) {
  return (
    <li className="flex justify-between bg-slate-700 p-2 rounded-lg">
      <span className={task.done ? "line-through text-gray-400" : ""}>
        {task.text}
      </span>
      <div className="space-x-2">
        <button
          onClick={() => onToggleDone(task.id)}
          className="text-green-400 hover:text-green-600"
        >
          {task.done ? "↩️" : "✅"}
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-red-400 hover:text-red-600"
        >
          ❌
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
