# AI Usage Disclosure

## 1. Tools Used
- **ChatGPT (OpenAI)**: Assisted with initial assignment requirement analysis, project planning, feature decomposition, and code review against assessment rubric criteria.
- **Google Antigravity**: Assisted with codebase scaffolding, full component implementation, CSS design token structuring, debugging, responsive layout adaptation, and automated browser-based QA testing.

---

## 2. Representative Prompts
The following are representative summaries of instructions used during the project, not necessarily verbatim quotations:

1. **Figma Design Implementation**:
   Implement the FocusBoard application from the supplied Figma reference screenshots (Desktop 1440×1000, Mobile 390×1128, Create-task form 760×822, Focus Notes slides 1–3), reproducing the sidebar, header, dynamic statistics, carousel, and task list without prebuilt dashboard templates.
2. **Strict Assessment Audit & Verification**:
   Perform a strict audit of the implementation against the official four-page assessment PDF: check for the missing "To do" filter, test tablet responsiveness at 768px width, verify localStorage persistence across page reloads, test combined filtering, and validate CRUD edge cases.
3. **Readiness Check & Documentation Accuracy**:
   Perform a final local project readiness check verifying all assignment requirements, production build success, clean Git working tree, screenshot existence, and accurate AI disclosure in AI_USAGE.md.

---

## 3. How AI Assisted the Workflow

### Planning
- Deconstructed the official four-page assignment PDF and Figma design references into discrete implementation milestones.
- Established the component hierarchy and unidirectional state flow architecture centered around a single source of truth in `App.jsx`.

### Implementation
- Generated functional React components (`Sidebar`, `Header`, `MobileHeader`, `FocusNotes`, `StatGrid`, `StatCard`, `TaskControls`, `TaskList`, `TaskCard`, `TaskFormModal`, `ConfirmDeleteModal`, `MobileBottomNav`).
- Configured CSS design tokens (`--primary-purple: #6355F6`, `--bg-app: #F8F9FD`, badge tints, shadows, and typography) to reproduce the Figma visual hierarchy.
- Built the `useLocalStorage` custom hook with defensive hydration and JSON error handling.

### Debugging
- Identified and fixed strict-mode locator ambiguities during testing (e.g. scoping form controls to modal dialogs).
- Resolved tablet (768px) horizontal clipping by introducing responsive grid adjustments and a 200px compact sidebar rail.
- Corrected input validation logic to block whitespace-only (`"   "`) task titles with explicit user feedback.

### Testing & Verification
- Conducted live browser testing across 7 verification suites:
  1. Status filter isolation across all 4 tabs (`All tasks`, `To do`, `In progress`, `Completed`).
  2. Tablet responsiveness at 768px width with zero horizontal overflow.
  3. LocalStorage persistence across page reloads (creation, editing, status toggle, deletion).
  4. Combined cooperative filtering (search + status + priority).
  5. CRUD edge cases (empty title, spaces-only title, cancel modal, cancel delete, zero-task percentage).
  6. Accessibility compliance (ARIA dialog roles, Escape key handler, `:focus-visible` styling, button labels).
  7. Mobile layout fidelity at 390×1128 (2 stat cards, floating '+' button, bottom navigation bar).

### Code Review
- Cross-checked the codebase against the official rubric to ensure strict alignment with core constraints (zero third-party state libraries, zero backend dependencies, pure React hooks and vanilla CSS).
- Verified that all dynamic values (task counts, completion percentages) are computed on-the-fly and never hardcoded.

---

## 4. Verified, Corrected or Rejected Suggestions

### Example 1: Mobile Overview Statistics Card Count
* **Initial AI Suggestion**: When generating the responsive layout for the statistics grid, the AI initially suggested keeping all 3 stat cards on mobile by stacking them vertically or shrinking them into a tight 3-column row.
* **Review & Verification**: Direct inspection of the official Figma mobile reference frame (`Mobile dashboard · 390 × 1128`) revealed that the mobile design deliberately displays **only two statistics cards** side-by-side: **Total tasks** and **Completed**. The *In progress* card is omitted on mobile to preserve vertical space and visual balance.
* **Correction Applied**: The AI suggestion was rejected. A targeted CSS modifier (`.stat-card.in-progress-stat { display: none }`) was applied under mobile media queries, ensuring fidelity with the Figma specification while preserving all 3 cards on desktop and tablet.

### Example 2: Status Filter Tabs Audit
* **Initial Implementation**: An earlier iteration only implemented `All tasks`, `In progress`, and `Completed` tabs based on standard Kanban states.
* **Review & Verification**: A strict audit against the official 4-page assessment specification identified that the required status list must explicitly include **To do** as a distinct filterable tab.
* **Correction Applied**: Added the **To do** filter tab to `TaskControls.jsx` and updated the filtering predicate in `App.jsx`, verified via automated browser testing.
