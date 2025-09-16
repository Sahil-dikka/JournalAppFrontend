export default function ModalScreen({ title, content , onConfirm, onCancel , action}) {
  return (
    <div>
      {/* Background Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.3)", // dark overlay
          backdropFilter: "blur(5px)", // blur effect
          zIndex: 999, // below modal
        }}
      ></div>

      {/* Modal */}
      <div
        className=" p-4 rounded text-black"
        style={{
          width: "370px",
          height: "200px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          opacity: 1,
          backgroundColor: "#e1ededff",
          borderRadius: "25px",
        }}
      >
        <h2>{title}</h2>
        <p>{content}</p>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-danger"
            style={{
              borderRadius: "10px",
              fontWeight: 500,
              padding: "0.4rem 1.2rem",
            }}
            onClick={onConfirm}
          >
            {action}
          </button>
          <button
            className="btn btn-outline-warning"
            style={{
              borderRadius: "10px",
              fontWeight: 500,
              padding: "0.4rem 1.2rem",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
