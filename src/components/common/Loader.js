import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-auto" style={{ height: "200px" }}>
      <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-secondary">{text}</p>
    </div>
  );
};

export default Loader;
