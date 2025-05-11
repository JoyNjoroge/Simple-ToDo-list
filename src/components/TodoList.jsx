import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ tasks, onDeleteTask, onToggleDone }) {
  return (
    <div className="glass p-4 rounded-xl">
    <h2 className="text-2xl mb-2">Tasks for the Day</h2>
    {tasks.length === 0 ? (
      <p className="text-gray-400">No tasks for this day.</p>
    ) : (
      <ul className="space-y-2">
         {tasks.map((task) => (
      <TodoItem
        key={task.id}
        task={task}
        onDeleteTask={onDeleteTask}
        onToggleDone={onToggleDone} // 👈 Pass it down
      />
        ))}
      </ul>
    )}
  </div>
);
}

export default TodoList;
