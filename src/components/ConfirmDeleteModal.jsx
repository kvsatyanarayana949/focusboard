import React, { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, taskTitle }) {
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="modal-container" style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#FEE2E2",
                color: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <h2 id="delete-dialog-title" style={{ fontSize: 18, fontWeight: 700 }}>
              Delete task
            </h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "20px 28px" }}>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            Are you sure you want to delete{" "}
            <strong>"{taskTitle}"</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
