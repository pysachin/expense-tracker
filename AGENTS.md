# AI Agent Guidelines for Expense Tracker

## Project Overview

**Expense Tracker** is a React 19 + TypeScript + Vite web application for tracking personal finances with income and expense transactions.

- **Stack**: React 19, TypeScript 6, Vite 8, ESLint with TypeScript support
- **Type Safety**: Strict TypeScript configuration with `verbatimModuleSyntax` enabled
- **Build Tool**: Vite for fast HMR development and optimized builds

## Quick Commands

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # TypeScript check + Vite build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

## Architecture & Key Conventions

### Type Safety Standards

- **Use explicit types**: All state, props, and function parameters must have TypeScript annotations
- **Type-only imports**: Import types with `import type { ... } from "react"` when `verbatimModuleSyntax` is enabled
- **Interfaces over types**: Use `interface` for object shapes, `type` for unions/aliases
- **Avoid deprecated APIs**:
  - ❌ Don't use `FormEvent` (deprecated in React 19+)
  - ✅ Use proper event types: `ChangeEvent<HTMLInputElement>`, `ChangeEvent<HTMLSelectElement>`
- **Built-in globals**: Use `Number.parseFloat()` instead of `parseFloat()`

### Data Models

```typescript
interface Transaction {
  id: number;
  description: string;
  amount: number; // Always numeric, not string
  type: "income" | "expense";
  category: string;
  date: string; // ISO format: YYYY-MM-DD
}
```

### Component Structure

Following Single Responsibility Principle, the app is organized into focused components:

- **App.tsx** - Main orchestrator: manages transactions state, filters, and coordinates child components
- **Summary.tsx** - Displays income, expenses, and balance calculations
- **TransactionForm.tsx** - Handles adding new transactions with form state management
- **TransactionFilters.tsx** - Filter UI controls (by type and category)
- **TransactionTable.tsx** - Displays filtered transaction list
- **types.ts** - Shared TypeScript interfaces and types (`Transaction`, `TransactionType`, `FilterType`)

**State management**: React hooks only (`useState`), no Redux/Context needed at this scale
**Filtering logic**: Composed filter by type, then by category

## Common Patterns to Follow

### State Updates

- Always use immutable patterns: `[...array, newItem]`
- Keep form inputs as strings, convert to proper types when creating objects
- Reset form after submit by setting state to defaults

### Event Handlers

- Type all event handlers explicitly
- Use `preventDefault()` to stop form submission
- Validate input before processing

### Rendering Lists

- Always use stable `key` prop (never index when items can be added/removed)
- Filter transactions before rendering in the map

## Development Tips

1. **TypeScript Compilation**: Run `npm run build` to catch type errors before deploying
2. **Linting**: `npm run lint` enforces code quality; fix issues before committing
3. **Styling**: CSS is in [App.css](App.css) — keep inline styles minimal
4. **Testing**: No test setup yet; consider adding Vitest or Jest if needed

## Next Steps & Improvements

- ✅ **Component split**: Completed - components extracted into separate files with SRP
- **Local storage**: Persist transactions to browser storage
- **Date handling**: Consider using a date library (date-fns, Day.js) for complex date operations
- **Testing**: Add unit tests for calculations (total income, balance, filtering)
- **Export/Import**: Add CSV export functionality for transaction history
- **Delete transactions**: Add functionality to remove transactions
- **Edit transactions**: Allow editing existing transactions
