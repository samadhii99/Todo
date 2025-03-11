import React, { useState } from "react";
import { Todo } from "../types/todo";

// Updated placeholder styles for class-based dark mode
const placeholderStyles = `
  input::placeholder, textarea::placeholder {
    color: #6366f1 !important;
    opacity: 0.8;
  }
  
  html.dark input::placeholder, 
  html.dark textarea::placeholder {
    color: #a5b4fc !important;
    opacity: 0.9;
  }
`;

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    completed: boolean
  ) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title || "");
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );

  const handleSave = () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty!");
      return;
    }
    updateTodo(todo.id, editTitle, editDescription, todo.completed);
    setIsEditing(false);
  };

  // More distinctive color classes based on completion status
  const containerColorClass = todo.completed
    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-emerald-500 dark:from-emerald-900/20 dark:to-green-900/20 dark:border-emerald-600"
    : "bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-600";

  return (
    <div
      className={`rounded-lg p-4 my-2 shadow-md transition-all duration-300 ${containerColorClass} dark:shadow-lg dark:shadow-gray-900/30`}
    >
      {/* Regular style tag for global styles */}
      <style>{placeholderStyles}</style>

      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            className="w-full p-2 border rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:outline-none border-gray-300 dark:border-gray-600"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Enter task title"
          />
          <textarea
            className="w-full p-2 border rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 focus:outline-none border-gray-300 dark:border-gray-600"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={2}
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-3 py-1 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="h-5 w-5 mr-2 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-500 dark:focus:ring-indigo-400 dark:border-gray-600 rounded"
              />
              <span
                className={`text-lg font-medium ${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {todo.title}
              </span>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 py-1 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 px-2 py-1 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          {todo.description && (
            <p className="mt-1 ml-7 text-gray-600 dark:text-gray-400">
              {todo.description}
            </p>
          )}
          {todo.completed && (
            <div className="mt-1 ml-7">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                Completed
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;