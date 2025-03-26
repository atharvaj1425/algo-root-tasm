import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaPlus, FaTrash, FaTimes, FaSignOutAlt } from "react-icons/fa";

const App = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [auth, setAuth] = useState({ username: "", email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = isRegister ? "/register" : "/login";
    try {
      const { data } = await axios.post(`/api/auth${url}`, auth);
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      setToken(data.data.token);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`/api/tasks/get-tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  const addTask = async () => {
    if (!newTask.title || !newTask.description) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await axios.post(`/api/tasks/add-tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, data.data]);
      setShowAddTaskModal(false);
      setNewTask({ title: "", description: "" });
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Error adding task");
    }
  };

  const updateTask = async (id, completeStatus) => {
    try {
      const { data } = await axios.put(`/api/tasks/${id}`, { completeStatus: !completeStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? data.data : task)));
      toast.success("Task updated");
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  // 🔹 Logout Function: Clears Token and Resets to Login/Register Page
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setAuth({ username: "", email: "", password: "" });
    setIsRegister(true);  // Reset to default state (Register/Login toggle)
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster />
      {!token ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold text-center mb-4">{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={handleAuth} className="space-y-3">
            {isRegister && (
              <input type="text" placeholder="Username" className="input-style" value={auth.username} onChange={(e) => setAuth({ ...auth, username: e.target.value })} required />
            )}
            <input type="email" placeholder="Email" className="input-style" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="input-style" value={auth.password} onChange={(e) => setAuth({ ...auth, password: e.target.value })} required />
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg">{isRegister ? "Register" : "Login"}</button>
          </form>
          <p className="text-center mt-3">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button className="text-blue-500" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Your Tasks</h1>
            <div className="flex space-x-2">
              <button className="bg-green-500 text-white p-2 rounded-lg flex items-center" onClick={() => setShowAddTaskModal(true)}>
                <FaPlus className="mr-2" /> Add Task
              </button>
              <button className="bg-red-500 text-white p-2 rounded-lg flex items-center" onClick={handleLogout}>
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className={`px-4 py-2 rounded-lg ${task.completeStatus ? "bg-green-500" : "bg-gray-400"} text-white`} onClick={() => updateTask(task._id, task.completeStatus)}>
                    {task.completeStatus ? "Completed" : "Pending"}
                  </button>
                  {task.completeStatus && (
                    <button className="bg-red-500 text-white p-2 rounded-lg" onClick={() => deleteTask(task._id)}>
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setShowAddTaskModal(false)}>
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <input type="text" placeholder="Title" className="input-style mb-2" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
            <textarea placeholder="Description" className="input-style mb-2" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} required></textarea>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg" onClick={addTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
