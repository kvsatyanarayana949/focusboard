import React from "react";
import { LayoutGrid, CheckSquare, Calendar, Settings } from "lucide-react";

export function MobileBottomNav({ activeTab = "overview", onTabChange }) {
  const items = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            onClick={() => onTabChange && onTabChange(item.id)}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={20} />
            <span>{item.label}</span>
            {isActive && <div className="bottom-nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}
