import { NavLink } from "react-router-dom";

const getNavLinkClass = ({ isActive }) => 
  `nav-link ${isActive ? "active" : ""}`;

function Navbar() {
  return (
    <div className="container mt-4">
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <NavLink to="/" className={getNavLinkClass}>Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/task-list" className={getNavLinkClass}>Task List (GET)</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/add-task" className={getNavLinkClass}>Add Task (POST)</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;