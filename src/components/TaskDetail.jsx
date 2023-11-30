import React from "react";
import { useTodo } from "../contexts";
import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const { todoId } = useParams();
  console.log(todoId);
  const { todos } = useTodo();
  console.log(todos);
  const todo = todos.find((t) => t.id === parseInt(todoId));
  console.log(todo);

  if (!todo) {
    return <p>Task not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-4">{todo.todo}</h2>
      <p className="text-gray-700 mb-2">Description: {todo.description}</p>
      <p className="text-gray-700 mb-2">Priority: {todo.priority}</p>
    </div>
  );
};

export default TaskDetail;
