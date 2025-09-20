// src/components/common/Loader.js
import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-2" role="status">
          <span className="visually-hidden">{text}</span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}
