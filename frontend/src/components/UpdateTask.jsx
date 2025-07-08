import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../Header'
import Footer from '../Footer'
import Navbar from "./NavBar";

function UpdateTask() {
    const { id } = useParams();
    const [task, setTask] = useState({
        title: "",
        type: "todo",
        dueDate: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch task details when the component mounts
    useEffect(() => {
        const fetchTask = async () => {
        try {
            // GET Request
            const response = await fetch(`http://localhost:8080/api/v1/task/${id}`, { method: "GET" })

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTask(data);
        } catch (error) {
            console.error("Error fetching task:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchTask();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // PUT Request
            const response = await fetch(`http://localhost:8080/api/v1/task/${id}`, { 
                method: "PUT",
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Task updated successfully!");
            navigate("/task-list"); // Redirect to the task list after updating
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading task details...</p>;
    }

    return (<>
        <Header/>
        <Navbar/>
        <div className="container mt-4">
            <h4>Task ID: {id}</h4>
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
                </div>

                {/* Type Field */}
                <div className="mb-3">
                <label className="form-label">Type:</label>
                <select
                    name="type"
                    value={task.type}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="todo">To Do</option>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                </select>
                </div>

                {/* Due Date Field */}
                <div className="mb-3">
                <label className="form-label">Due Date:</label>
                <input
                    type="date"
                    name="dueDate"
                    value={new Date(task.dueDate).toISOString().split("T")[0]}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
                </div>

                {/* Description Field */}
                <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="form-control"
                />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                Update Task
                </button>
            </form>
        </div>
        <Footer/>
    </>
  );
}

export default UpdateTask
