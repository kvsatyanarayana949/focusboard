import React from "react";
import { Search, ChevronDown, X } from "lucide-react";

export function TaskControls({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  totalTasksCount,
}) {
  const tabs = [
    { id: "all", label: `All tasks ${totalTasksCount}`, mobileLabel: `All ${totalTasksCount}` },
    { id: "in-progress", label: "In progress", mobileLabel: "In progress" },
    { id: "completed", label: "Completed", mobileLabel: "Completed" },
  ];

  return (
    <div className="task-controls-bar">
      {/* Status Tabs */}
      <div className="filter-tabs-row" role="tablist" aria-label="Task Status Filters">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`filter-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => onStatusFilterChange(tab.id)}
            >
              <span className="desktop-tab-label">{tab.label}</span>
              <span className="mobile-tab-label" style={{ display: "none" }}>{tab.mobileLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input & Priority Dropdown */}
      <div className="controls-right-group">
        <div className="search-box">
          <Search size={16} color="#8F95B2" />
          <input
            type="text"
            placeholder="Find a task..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tasks by title"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              style={{ color: "#8F95B2", display: "flex" }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="priority-select-box">
          <label htmlFor="priority-filter" className="sr-only" style={{ display: "none" }}>
            Priority Filter
          </label>
          <span>Priority:</span>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <ChevronDown size={14} className="priority-select-chevron" />
        </div>
      </div>
    </div>
  );
}
