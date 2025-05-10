import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TodoList from "./components/TodoList";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      date: selectedDate.toDateString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">📝 To-Do Calendar</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-4 rounded-xl">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p className="mt-2 text-center">Selected Date: {selectedDate.toDateString()}</p>
          <AddTaskForm onAddTask={handleAddTask} />
        </div>
        <TodoList
          tasks={tasks.filter((task) => task.date === selectedDate.toDateString())}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <div>
        <h1 className="by">This is a simple todo list app by Joy Njoroge</h1>
      </div>
    </div>
  );
}

export default App;
