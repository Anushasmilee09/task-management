import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import { signInWithGoogle } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update for production

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    socket.on("task_updated", () => {
      if (user) fetchTasks(user.email);
    });
    return () => socket.disconnect();
  }, [user]);

  const fetchTasks = async (email) => {
    const res = await axios.get(`http://localhost:5000/api/tasks/${email}`);
    setTasks(res.data);
  };

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    setUser(result.user);
    fetchTasks(result.user.email);
  };

  const handleSave = async (taskData) => {
    if (selectedTask) {
      await axios.put(`http://localhost:5000/api/tasks/${selectedTask._id}`, taskData);
      toast.success("Task updated!");
    } else {
      await axios.post("http://localhost:5000/api/tasks", {
        ...taskData,
        createdBy: user.email
      });
      toast.success("Task added!");
    }
    setSelectedTask(null);
    fetchTasks(user.email);
    socket.emit("task_updated");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    toast.error("Task deleted!");
    fetchTasks(user.email);
    socket.emit("task_updated");
  };

  return (
    <div className="container">
      <ToastContainer />
      {!user ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <TaskForm onSave={handleSave} selectedTask={selectedTask} />
          <TaskList tasks={tasks} onEdit={setSelectedTask} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default App;
