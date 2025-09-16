import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalScreen from "./common/ModalScreen";

export default function JournalCard({ title, content, id, isModalOpen, setIsModalOpen, onDeleteClick }) {

  

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/journal/${id}`);
  };
  
  const handleDelete = () => {
    onDeleteClick()
  }

  return (
    <div
      className="card m-3 shadow-sm"
      style={{
        borderRadius: "18px",
        background: "linear-gradient(135deg, #ece1f7ff 0%, #dde4ebff 100%)",
        border: "none",
        width: "340px",       // fixed width
        height: "200px",      // fixed height (adjust as needed)
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // keeps buttons aligned at bottom
      }}
    >
      <div className="card-body d-flex flex-column" style={{ padding: "1.5rem" }}>
        <h5
          className="card-title fw-bold text-primary mb-2"
          style={{ fontSize: "1.3rem" }}
        >
          {title}
        </h5>
        <p
          className="card-text text-muted mb-3 flex-grow-1"
          style={{
            fontSize: "1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3, // show only 3 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {content ? content.split(" ").slice(0, 10).join(" ") + "..." : " "}
        </p>
        <div className="d-flex justify-content-between gap-5 mt-auto">
          <button
            className="btn btn-primary"
            style={{
              borderRadius: "10px",
              fontWeight: 500,
              padding: "0.4rem 1.2rem",
            }}
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger"
            style={{
              borderRadius: "10px",
              fontWeight: 500,
              padding: "0.4rem 1.2rem",
            }}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    
      
      </div>
  );
}
