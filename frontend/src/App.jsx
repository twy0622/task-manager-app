import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/task-list" element={<TaskList/>} />
                    <Route path="/add-task" element={<AddTask/>} />
                    <Route path="/update-task/:id" element={<UpdateTask/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}       

export default App
