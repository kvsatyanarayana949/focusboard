import React, { useState, useRef, useEffect } from "react";
import { Check, Calendar, MoreHorizontal, Edit2, Trash2 } from "lucide-react";

export function TaskCard({ task, onToggleStatus, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Format date: e.g., "2026-11-22" -> "Nov 22"
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    try {
      const parts = dateString.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
      return dateString;
    } catch {
      return dateString;
    }
  };

  const getCategoryClass = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("design")) return "badge-design";
    if (c.includes("dev")) return "badge-development";
    if (c.includes("content")) return "badge-content";
    if (c.includes("research")) return "badge-research";
    if (c.includes("analytics")) return "badge-analytics";
    return "badge-default";
  };

  const getPriorityClass = (pri) => {
    const p = (pri || "").toLowerCase();
    if (p === "high") return "priority-high";
    if (p === "medium") return "priority-medium";
    return "priority-low";
  };

  const isCompleted = task.status === "Completed";
  const isInProgress = task.status === "In progress";

  return (
    <article className="task-row" aria-label={`Task: ${task.title}`}>
      <div className="task-row-left">
        <button
          type="button"
          className={`task-status-btn ${isCompleted ? "completed" : isInProgress ? "in-progress" : ""}`}
          onClick={() => onToggleStatus(task.id)}
          aria-label={`Current status: ${task.status}. Click to change status`}
          title={`Status: ${task.status} (Click to toggle)`}
        >
          {isCompleted && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="task-details">
          <h3 className={`task-title ${isCompleted ? "completed-text" : ""}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="task-subtitle">{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-row-right">
        {task.category && (
          <span className={`badge ${getCategoryClass(task.category)}`}>
            {task.category}
          </span>
        )}

        <span className={`badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>

        {task.dueDate && (
          <div className="task-due-date">
            <Calendar size={13} color="#8F95B2" />
            <span>{formatDisplayDate(task.dueDate)}</span>
          </div>
        )}

        <div className="action-menu-wrapper" ref={menuRef}>
          <button
            type="button"
            className="action-menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Task options menu"
            aria-expanded={menuOpen}
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className="action-dropdown-popup" role="menu">
              <button
                type="button"
                className="action-dropdown-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(task);
                }}
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>

              <button
                type="button"
                className="action-dropdown-item delete"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(task.id);
                }}
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
