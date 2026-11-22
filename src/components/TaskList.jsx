import React from "react";
import { CheckCircle2, SearchX } from "lucide-react";
import { TaskCard } from "./TaskCard";

export function TaskList({
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
  onStatusChange,
  isFiltered,
  onResetFilters,
  onOpenCreateModal,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        {isFiltered ? (
          <>
            <SearchX size={36} color="#8F95B2" />
            <h3>No matching tasks found</h3>
            <p>Try adjusting your search terms or filter criteria.</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={onResetFilters}
              style={{ marginTop: 8 }}
            >
              Reset filters
            </button>
          </>
        ) : (
          <>
            <CheckCircle2 size={36} color="#6355F6" />
            <h3>No tasks yet</h3>
            <p>Get started by adding your first task to FocusBoard.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={onOpenCreateModal}
              style={{ marginTop: 8 }}
            >
              Add your first task
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="task-rows-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
