# AI Usage Disclosure

## 1. Tools Used
- **Google Antigravity (powered by Gemini 3.8 Flash)**: Used for rapid architecture scaffolding, CSS design token structuring, and automated UI testing verification.

---

## 2. Representative Prompts
Below are representative prompts utilized during the project development:

1. *"Analyze the FocusBoard Figma frames (Desktop 1440x1000, Mobile 390x1128, Create Task Modal 760x822, Focus Notes slides 1-3) and extract the exact visual tokens, component hierarchy, and responsive layout differences."*
2. *"Implement a custom React hook `useLocalStorage` that safely reads and writes task data without throwing exceptions during JSON serialization or overwriting user data on page reload."*
3. *"Construct the Focus Notes 3-slide productivity carousel with circular next/previous navigation, interactive slide indicator pills, and the floating tilted progress card."*
4. *"Create a cooperative filtering pipeline in React that simultaneously evaluates title keywords (case-insensitive), status tab selection, and priority dropdown level with dynamic empty states."*

---

## 3. AI-Assisted Areas
- **CSS Design Tokens & Styling**: Structuring custom CSS variables (`--primary-purple: #6355F6`, `--bg-app: #F8F9FD`, badge tints, shadows, and rounded corners) to accurately reproduce Figma references.
- **Component Decomposition**: Defining clean component boundaries (`Sidebar`, `Header`, `StatGrid`, `FocusNotes`, `TaskControls`, `TaskList`, `TaskCard`, `TaskFormModal`, `ConfirmDeleteModal`, `MobileBottomNav`).
- **Responsive Media Query Architecture**: Creating dedicated desktop and mobile layouts (e.g., hiding desktop sidebar on mobile, introducing the mobile bottom navigation bar and mobile top header).

---

## 4. Verified, Corrected or Rejected Suggestion

### Example: Mobile Overview Statistics Card Layout
* **Initial AI Suggestion**: When generating the responsive layout for the statistics grid, the AI initially suggested keeping all 3 stat cards on mobile by stacking them in a single column or shrinking them to a 3-column row.
* **Review & Verification**: Inspection of the official Figma mobile reference frame (`Mobile dashboard · 390 × 1128`) revealed that the mobile design specifically shows **only two statistics cards** side-by-side under the `Overview` heading: **Total tasks** (12) and **Completed** (7). The *In progress* card is deliberately omitted on mobile to preserve vertical space and visual balance.
* **Correction Applied**: The AI suggestion was rejected. Instead, a targeted CSS modifier (`.stat-card.in-progress-stat`) was introduced with `display: none` under `@media (max-width: 768px)`, ensuring exact visual fidelity with the official Figma mobile specification while preserving all 3 cards on desktop and tablet viewports.
