import React from "react";
import { LayoutGrid, CheckSquare, Calendar, Settings } from "lucide-react";

export function Sidebar({ activeTab = "overview", onTabChange }) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "tasks", label: "My tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
      <div className="sidebar-logo">
        <div className="logo-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="2" fill="white" />
            <rect x="14" y="3" width="7" height="7" rx="2" fill="white" />
            <rect x="3" y="14" width="7" height="7" rx="2" fill="white" />
            <rect x="14" y="14" width="7" height="7" rx="2" fill="white" />
          </svg>
        </div>
        <span className="logo-text">FocusBoard</span>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => onTabChange && onTabChange(item.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
