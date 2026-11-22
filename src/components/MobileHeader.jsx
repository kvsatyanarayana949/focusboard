import React from "react";

export function MobileHeader() {
  return (
    <header className="mobile-header" role="banner">
      <div className="sidebar-logo" style={{ margin: 0 }}>
        <div className="logo-icon" aria-hidden="true" style={{ width: 32, height: 32 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="2" fill="white" />
            <rect x="14" y="3" width="7" height="7" rx="2" fill="white" />
            <rect x="3" y="14" width="7" height="7" rx="2" fill="white" />
            <rect x="14" y="14" width="7" height="7" rx="2" fill="white" />
          </svg>
        </div>
        <span className="logo-text" style={{ fontSize: 17 }}>FocusBoard</span>
      </div>

      <div className="avatar-circle" style={{ width: 34, height: 34, fontSize: 12 }}>
        JD
      </div>
    </header>
  );
}
