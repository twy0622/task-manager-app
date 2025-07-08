import { useState } from "react";
import Header from '../Header'
import Footer from '../Footer'
import Navbar from "./NavBar";

function AddTask() {
    const [task, setTask] = useState({
        title: "",
        type: "todo",
        dueDate: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // POST Request
            const response = await fetch("http://localhost:8080/api/v1/task", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Task added successfully!");

            // reset form values
            setTask({
                title: "",
                type: "todo",
                dueDate: "",
                description: "",
            });
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }
    };

    return (
        <>
            <Header/>
            <Navbar/>
            <div className="container mt-4">
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
                            value={task.dueDate}
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
                        required
                    />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">
                    Add Task
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    )
}       

export default AddTask
