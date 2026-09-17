# PRD: Portfolio Updates — Rename, i18n, and Projects Redesign

## Introduction

Update the existing portfolio website with three changes: rename all content from "Andi Pratama" to "Yehezkiel Satya", translate all Indonesian text to English, and redesign the Projects section with smaller cards, an overlay detail modal, a GitHub code button per card, and Show More/Show Less toggle.

## Goals

- Update all personal references to "Yehezkiel Satya"
- Translate all Indonesian UI text to English
- Reduce projects card size for a cleaner grid layout
- Add overlay detail modal when clicking a project card
- Replace full-card GitHub link with a small "Code" button on each card
- Add Show More / Show Less toggle for project visibility

## User Stories

### US-001: Update Name and Language
**Description:** As a visitor, I want to see the correct name "Yehezkiel Satya" and English text throughout the site.

**Acceptance Criteria:**
- [ ] Hero section displays "Yehezkiel Satya" instead of "Andi Pratama"
- [ ] About section displays "Yehezkiel Satya" as the timeline title
- [ ] Contact footer displays "Yehezkiel Satya" in the copyright
- [ ] All social links point to `yehezkielsatya` usernames
- [ ] All Indonesian text translated: "Pendidikan" → "Education", "Pengalaman" → "Experience", "Karya Pilihan" → "Selected Work", "Mari Bekerja Bersama" → "Let's Work Together", etc.
- [ ] Lint passes

### US-002: Projects Card Layout Reduction
**Description:** As a visitor, I want smaller project cards so the grid feels less heavy and more scannable.

**Acceptance Criteria:**
- [ ] Grid gap reduced from 6 to 4 (Tailwind `gap-4`)
- [ ] Card padding reduced from 6 to 4 (`p-4`)
- [ ] Project title font size reduced from 2xl to text-lg
- [ ] Card remains clickable (opens overlay)
- [ ] Lint passes
- [ ] **[UI]** Verify in browser

### US-003: GitHub Code Button on Project Cards
**Description:** As a visitor, I want a small "Code" button on each card to quickly access the GitHub repo without opening the full overlay.

**Acceptance Criteria:**
- [ ] Each project card has a "Code" button in the top-right corner of the card body
- [ ] Button shows GitHub icon + "Code" label
- [ ] Clicking the button opens the project link in a new tab (no overlay)
- [ ] Button click does not trigger the card overlay (stopPropagation)
- [ ] Hover state: border brightens, text turns white
- [ ] Lint passes
- [ ] **[UI]** Verify in browser

### US-004: Project Detail Overlay
**Description:** As a visitor, I want to click a project card to see more details in a modal overlay instead of navigating away.

**Acceptance Criteria:**
- [ ] Clicking a project card opens an overlay/modal with project details
- [ ] Overlay shows: full description, role, tech stack tags, year
- [ ] Overlay has a "View on GitHub" button and a "Back" button
- [ ] Clicking outside the overlay or pressing Back closes it
- [ ] Overlay animates in with fade + scale transition
- [ ] Data file `projects.js` includes `fullDescription`, `techStack`, and `role` fields
- [ ] Lint passes
- [ ] **[UI]** Verify in browser

### US-005: Show More / Show Less Toggle
**Description:** As a visitor, I want to control how many projects are visible at once with a toggle button.

**Acceptance Criteria:**
- [ ] Default shows 3 projects (INITIAL_COUNT = 3)
- [ ] "Show More" button loads 3 additional projects per click
- [ ] Button label changes to "Show Less" when all projects are visible
- [ ] "Show Less" button collapses back to 3 projects
- [ ] Arrow icon rotates 180° when toggled to "Show Less"
- [ ] Button is always visible (not conditional)
- [ ] Lint passes
- [ ] **[UI]** Verify in browser

## Functional Requirements

- FR-1: Replace all instances of "Andi Pratama" with "Yehezkiel Satya" in data files and components
- FR-2: Translate all Indonesian text in components and data files to English
- FR-3: Reduce projects grid gap from `gap-6` to `gap-4`
- FR-4: Reduce projects card body padding from `p-6` to `p-4`
- FR-5: Reduce project card title from `text-2xl` to `text-lg`
- FR-6: Add a "Code" button (external link) to each project card, positioned top-right in the card body
- FR-7: Add `onClick` to card that opens overlay (with `stopPropagation` on the Code button)
- FR-8: Implement overlay component with AnimatePresence for enter/exit animations
- FR-9: Overlay displays `fullDescription`, `role`, and `techStack` from project data
- FR-10: Overlay has "View on GitHub" primary button and "Back" secondary button
- FR-11: Add `visibleCount` state (initial: 3) to ProjectsSection
- FR-12: Show More loads 3 more projects; Show Less resets to 3
- FR-13: Arrow icon in toggle button rotates 180° when collapsed

## Non-Goals

- No per-project detail page/routing
- No project filtering or search
- No project sorting by year or tag
- No lazy loading images beyond existing `loading="lazy"`
- No animation changes to other sections

## Design Considerations

- Maintain existing soft minimal dark theme (bg `#0e0e14`, accent white)
- Overlay uses backdrop blur with semi-transparent dark background
- Card hover states remain consistent (scale image, border brightness)
- Toggle button centered below the grid, always visible

## Technical Considerations

- Data structure change: `projects.js` needs `fullDescription`, `techStack`, `role` fields added to each project
- `visibleCount` state managed in `ProjectsSection` component
- Overlay uses Framer Motion `AnimatePresence` + `motion.div` for transitions
- Event propagation: `e.stopPropagation()` on Code button click to prevent overlay trigger

## Success Metrics

- All 6 projects display correctly in the grid at reduced size
- Overlay opens and closes smoothly without jank
- Show More/Show Less toggle works bidirectionally
- All text is in English, name is "Yehezkiel Satya" throughout
- No lint warnings

## Open Questions

- Should the overlay also close on Escape key press? (recommended)
- Should the initial visible count be configurable as a prop?
