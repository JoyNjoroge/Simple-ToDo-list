import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAddTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task..."
        className="flex-1 p-2 rounded-lg text-black"
      />
      <button className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg">Add</button>
    </form>
  );
}

export default AddTaskForm;
