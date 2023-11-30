import React, { useState } from "react";
import { useTodo } from "../contexts";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskForm = () => {
  const { todoId } = useParams();

  const { todos, updateTodo } = useTodo();

  const todo = todos.find((t) => t.id === parseInt(todoId));
  console.log(todo);

  const [editedTodo, setEditedTodo] = useState({
    todo: todo.todo,
    description: todo.description || "",
    priority: todo.priority || "low",
  });

  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTodo = {
      ...todo,
      todo: editedTodo.todo,
      description: editedTodo.description,
      priority: editedTodo.priority,
    };

    // Perform update
    updateTodo(todo.id, updatedTodo);

    // Close the modal
    closeForm();
    navigate("/my-tasks");
  };

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCancel = () => {
    navigate("/my-tasks");
  };

  const closeForm = () => {
    // Set isModalOpen to false to hide the modal
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={editedTodo.todo}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, todo: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={editedTodo.description}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, description: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Priority
            </label>
            <select
              value={editedTodo.priority}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, priority: e.target.value })
              }
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
