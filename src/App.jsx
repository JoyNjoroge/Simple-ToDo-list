import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TodoList from "./components/TodoList";
import AddTaskForm from "./components/AddTaskForm";

// Format date to YYYY-MM-DD for consistent filtering
const formatDate = (date) => date.toISOString().split("T")[0];

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch tasks from backend
  useEffect(() => {
    fetch("https://simple-todo-list-w45p.onrender.com/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAddTask = (text) => {
    const newTask = {
      text,
      done: false,
      date: formatDate(selectedDate),
    };

    fetch("https://simple-todo-list-w45p.onrender.com/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((addedTask) => {
        console.log("Task added:", addedTask);
        setTasks([...tasks, addedTask]);
      })
      .catch((err) => {
        console.error("Add task error:", err);
        alert("Failed to add task.");
      });
  };

  const handleDeleteTask = (id) => {
    fetch(`https://simple-todo-list-w45p.onrender.com/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  const handleToggleDone = (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    fetch(`https://simple-todo-list-w45p.onrender.com/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !taskToToggle.done }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(
          tasks.map((task) => (task.id === id ? updatedTask : task))
        );
      })
      .catch((err) => console.error("Toggle done error:", err));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">📝 To-Do Calendar</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="calender">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p className="mt-2 text-center">
            Selected Date: {formatDate(selectedDate)}
          </p>
          <AddTaskForm onAddTask={handleAddTask} />
        </div>
        <TodoList
          tasks={tasks.filter((task) => task.date === formatDate(selectedDate))}
          onDeleteTask={handleDeleteTask}
          onToggleDone={handleToggleDone}
        />
      </div>
      <div>
        <h1 className="by">This is a simple todo list app by Joy Njoroge</h1>
      </div>
    </div>
  );
}

export default App;
