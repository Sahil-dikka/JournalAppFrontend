import React from "react";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-muted mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  );
}