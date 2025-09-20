// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalScreen from "./common/ModalScreen";


export default function Navbar() {

  const navigate = useNavigate();
  let userName = localStorage.getItem("userName") || "User";
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogout = () => {
    
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.removeItem("userName");
    navigate("/",{ replace: true });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand fw-bold" to="/dashboard">
          Journal App
        </Link>

        {/* Right-side options */}
        <div className="d-flex">
          <p className="text-white mb-0 me-3 mt-1">Welcome, {userName}</p>
          <button className="btn btn-outline-light" onClick={() => setIsModalOpen(true)}>Logout</button>
        </div>
      </div>

      {
        isModalOpen && (
          <ModalScreen
          title={"Confirm Logout"}
            content={"Are you sure you want to logout?"}
            onConfirm={handleLogout}
            onCancel={() => setIsModalOpen(false)}
            action={"Logout"}
          />
        )
      }
    </nav>
  );
}
