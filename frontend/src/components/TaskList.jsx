import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../Header'
import Footer from '../Footer'
import Navbar from "./NavBar";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // GET Request
        const response = await fetch("http://localhost:8080/api/v1/task", { method: "GET" })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      // DELETE request
      const response = await fetch(`http://localhost:8080/api/v1/task/${taskId}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Remove task from state
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="container mt-4">
        {/* Task Cards */}
        <div className="row">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    {/* Task Title */}
                    <h5 className="card-title">{task.title}</h5>

                    {/* Task Type */}
                    <div className="mb-2">
                      <span className={`badge ${
                        task.type === 'done' ? 'bg-success' :
                        task.type === 'pending' ? 'bg-warning' : 'bg-secondary'
                      }`}>
                        {task.type === 'done' ? '✅ Done' :
                        task.type === 'pending' ? '⏳ Pending' : '📝 To Do'}
                      </span>
                    </div>

                    {/* Due Date */}
                    <p className="card-text">
                      <strong>Due Date:</strong>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>

                    {/* Description */}
                    <p className="card-text">
                      <strong>Description:</strong> {task.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <Link 
                        to={`/update-task/${task.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Update (PUT)
                      </Link>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete (DELETE)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Fallback Message
            <div className="col-12 text-center">
              <p className="text-muted">No tasks available.</p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default TaskList;