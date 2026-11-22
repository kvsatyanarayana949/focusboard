import React from "react";
import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="top-header" role="banner">
      <div className="breadcrumbs">
        <span className="breadcrumb-root">Workspace</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Overview</span>
      </div>

      <div className="user-profile" tabIndex={0} role="button" aria-label="User profile John Doe">
        <div className="avatar-circle">JD</div>
        <ChevronDown size={16} color="#8F95B2" />
      </div>
    </header>
  );
}
