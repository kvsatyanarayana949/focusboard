import React from "react";

export function StatCard({
  icon: Icon,
  iconTheme = "purple",
  label,
  value,
  subtext,
  badgeText,
  className = "",
}) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card-header">
        <div className={`stat-icon-wrapper stat-icon-${iconTheme}`}>
          <Icon size={18} />
        </div>
        {badgeText ? (
          <span className="stat-badge-in-progress">{badgeText}</span>
        ) : (
          <span className="stat-label">{label}</span>
        )}
      </div>

      <div className="stat-card-body">
        <span className="stat-value">{value}</span>
        <span className="stat-subtext">{subtext}</span>
      </div>
    </div>
  );
}
