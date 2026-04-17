# Implementation Plan: Add Ticket Status Pie Chart

## Goal
Add a pie/donut chart below the ticket table showing ticket count distribution by status.

## Design Decisions

### Chart Library
- **Option**: CSS-based donut chart (no external dependency)
- **Rationale**: Lightweight, matches existing Tailwind styling, no npm package needed
- **Alternative**: Chart.js if needed for more complex charts

### Color Scheme (matching existing UI)
| Status | Color |
|--------|-------|
| New | Blue (#3b82f6) |
| Assigned | Yellow (#f59e0b) |
| Done | Green (#22c55e) |
| Escalate | Red (#ef4444) |

## Implementation Steps

### Step 1: Create Stats Card Component
- Location: `frontend/src/app/components/ticket-stats/`
- Display total tickets and status breakdown

### Step 2: Create Pie Chart Component
- Donut chart using CSS conic-gradient
- Responsive sizing
- Legend with counts

### Step 3: Integrate with Dashboard
- Add chart below ticket table
- Connect to ticket data via service

## Verification Plan

### Manual Testing
1. Verify chart renders with correct colors
2. Verify counts match table data
3. Verify responsive behavior

### Build Verification
- `npm run build` passes
- No console errors
