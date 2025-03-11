import React, { useState, useEffect } from "react";
import { Todo } from "./types/todo";
import TodoItem from "./components/TodoItem";
import { Button } from "@/components/ui/button";
import "./styles/tailwind.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedDarkMode = localStorage.getItem("darkMode");
    
    if (savedDarkMode !== null) {
      // If we have a saved preference, use it
      const isDark = savedDarkMode === "true";
      setDarkMode(isDark);
      applyDarkMode(isDark);
    } else {
      // Otherwise use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      applyDarkMode(prefersDark);
      
      // Save this preference
      localStorage.setItem("darkMode", prefersDark.toString());
    }
  }, []);

  // Helper function to apply dark mode
  const applyDarkMode = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    
    // Update state
    setDarkMode(newDarkMode);
    
    // Apply the change to the HTML element
    applyDarkMode(newDarkMode);
    
    // Save the preference
    localStorage.setItem("darkMode", newDarkMode.toString());
    
    // For debugging
    console.log("Dark mode toggled:", newDarkMode);
    console.log("HTML has dark class:", document.documentElement.classList.contains("dark"));
  };

  const addTodo = () => {
    if (!newTodoTitle.trim()) {
      setErrorMessage("Title cannot be empty.");
      return;
    }
    setErrorMessage("");

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoTitle("");
    setNewTodoDescription("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (
    id: string,
    title: string,
    description: string,
    completed: boolean
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description, completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen w-full">
      {/* Pattern Background & Design Elements */}
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500 overflow-hidden p-4 md:p-8 lg:p-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating circles */}
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 dark:bg-white/5 blur-xl"></div>
          <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-pink-500/10 dark:bg-pink-800/10 blur-xl"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-indigo-300/15 dark:bg-indigo-700/10 blur-xl"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22none%22 stroke=%22%23FFFFFF%22 stroke-width=%220.25%22 stroke-opacity=%220.05%22/%3E%3C/svg%3E')] bg-[length:50px_50px] opacity-30 dark:opacity-20"></div>
        </div>

        {/* Main Container with glass effect */}
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-6 md:p-8 lg:p-10 flex flex-col space-y-6 transition-all duration-300 border border-white/20 dark:border-gray-700/30">
          {/* Header with Theme Toggle */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Todo List
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-100/80 dark:bg-red-900/30 border-l-4 border-red-500 rounded backdrop-blur-sm">
              <p className="text-red-700 dark:text-red-300 font-medium">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Input Fields with responsive styling */}
          <div className="space-y-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="pl-10 p-3 md:p-4 border-2 border-indigo-200 dark:border-indigo-700/50 rounded-lg w-full text-base md:text-lg bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400 dark:text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <input
                type="text"
                placeholder="Add details (optional)"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                className="pl-10 p-3 md:p-4 border-2 border-indigo-200 dark:border-indigo-700/50 rounded-lg w-full text-base md:text-lg bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors backdrop-blur-sm"
              />
            </div>
            <Button
              onClick={addTodo}
              className="w-full py-3 px-6 text-base md:text-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Add Todo
            </Button>
          </div>

          {/* Statistics Bar */}
          <div className="flex justify-between items-center px-4 py-3 bg-indigo-50/80 dark:bg-indigo-900/30 rounded-lg backdrop-blur-sm transition-colors border border-indigo-100 dark:border-indigo-800/30">
            <span className="text-sm md:text-base text-indigo-700 dark:text-indigo-300 font-medium">
              {todos.length} total item{todos.length !== 1 ? "s" : ""}
            </span>
            <span className="text-sm md:text-base text-indigo-700 dark:text-indigo-300 font-medium">
              {todos.filter((todo) => todo.completed).length} completed
            </span>
          </div>

          {/* Todo List with responsive grid and scrolling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto max-h-96 md:max-h-[32rem] pr-1">
            {todos.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-10 text-center bg-indigo-50/50 dark:bg-gray-700/30 rounded-xl backdrop-blur-sm p-8">
                <svg
                  className="w-16 h-16 text-indigo-400 dark:text-indigo-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-indigo-700 dark:text-indigo-300 text-lg md:text-xl font-medium">
                  Your todo list is empty
                </p>
                <p className="text-indigo-500 dark:text-indigo-400 text-base mt-2">
                  Add your first task above to get started
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-indigo-500/70 dark:text-indigo-400/50 mt-4">
            Click the sun/moon icon to toggle between light and dark mode
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;