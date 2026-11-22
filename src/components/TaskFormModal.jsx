import React, { useState, useEffect, useRef } from "react";
import { X, Calendar } from "lucide-react";

export function TaskFormModal({ isOpen, onClose, onSave, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Design");
  const [errorMessage, setErrorMessage] = useState("");

  const titleInputRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setStatus(editingTask.status || "To do");
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.dueDate || "");
      setCategory(editingTask.category || "Design");
    } else {
      setTitle("");
      setDescription("");
      setStatus("To do");
      setPriority("Medium");
      // Default due date to today or empty
      const today = new Date().toISOString().split("T")[0];
      setDueDate(today);
      setCategory("Design");
    }
    setErrorMessage("");
  }, [editingTask, isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Focus on title input when modal opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage("Please enter a valid task title.");
      titleInputRef.current?.focus();
      return;
    }

    if (!dueDate) {
      setErrorMessage("Please select a valid due date.");
      return;
    }

    const taskPayload = {
      ...(editingTask ? { id: editingTask.id } : {}),
      title: trimmedTitle,
      description: description.trim(),
      status,
      priority,
      dueDate,
      category: category || "Design",
    };

    onSave(taskPayload);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="modal-title">
              {editingTask ? "Edit task" : "Create new task"}
            </h2>
            <p>
              {editingTask
                ? "Update your task details and keep your list accurate."
                : "Add your task details to stay on top of your work."}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errorMessage && (
              <div
                className="form-error-msg"
                role="alert"
                style={{
                  background: "#FEF2F2",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #FCA5A5",
                }}
              >
                {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="task-title" className="form-label">
                Task title *
              </label>
              <input
                id="task-title"
                ref={titleInputRef}
                type="text"
                className="form-input"
                placeholder="e.g. Update pricing page"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-desc" className="form-label">
                Description
              </label>
              <textarea
                id="task-desc"
                className="form-textarea"
                placeholder="Add notes about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-row-two-col">
              <div className="form-group">
                <label htmlFor="task-status" className="form-label">
                  Status
                </label>
                <select
                  id="task-status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="task-priority" className="form-label">
                  Priority
                </label>
                <select
                  id="task-priority"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label">
                Due date *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="task-due-date"
                  type="date"
                  className="form-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="required-footnote">* Required field</div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingTask ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
