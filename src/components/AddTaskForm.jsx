import React, { useState } from "react";
import { useTodo } from "../contexts";

function AddTaskForm() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low"); // default priority

  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({
      todo,
      description,
      priority,
      completed: false,
    });

    // Clear form fields after adding task
    setTodo("");
    setDescription("");
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task Name
        </label>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter task name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter task description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
