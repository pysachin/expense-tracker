---
name: before-commit
description: "Pre-commit code quality checks for Expense Tracker. Use when: preparing to commit code; running TypeScript type checks; validating ESLint compliance; ensuring code meets project standards."
---

# Before Commit Checks

Pre-commit code quality checklist for the Expense Tracker project. Verify these standards before committing code.

## Quick Checklist

Run these commands in order:

```bash
npm run lint      # ESLint code quality check
npm run build     # TypeScript type checking + Vite build validation
npm run preview   # Preview production build locally
```

## Type Safety Verification

✅ **Always verify:**

- [ ] All function parameters have TypeScript type annotations
- [ ] All state variables use `useState<Type>` with explicit types
- [ ] Event handlers use correct event types (not deprecated `FormEvent`)
  - ✅ Use: `ChangeEvent<HTMLInputElement>`, `ChangeEvent<HTMLSelectElement>`
  - ❌ Avoid: `FormEvent` (deprecated in React 19+)
- [ ] Built-in globals use `Number.parseFloat()` not `parseFloat()`
- [ ] Type-only imports use `import type { ... }`

## Component Standards

✅ **Component structure checks:**

- [ ] File follows Single Responsibility Principle (one main purpose)
- [ ] Props interface defined with `interface ComponentProps { ... }`
- [ ] State updates use immutable patterns (`[...array, item]`)
- [ ] Form inputs stay as strings until object creation
- [ ] Keys on list renders are stable (never index-based)
- [ ] Event handlers prevent default where needed

## Data Model Compliance

✅ **Transaction interface validation:**

```typescript
interface Transaction {
  id: number;
  description: string;
  amount: number; // Always numeric, NOT string
  type: "income" | "expense";
  category: string;
  date: string; // ISO format: YYYY-MM-DD
}
```

## Pre-Commit Workflow

0. **Update agent configuration** (run once or when AGENTS.md changes)

   ```bash
   /init
   ```

   This loads project-specific skills and guidelines into the agent configuration.

1. **Run TypeScript check**

   ```bash
   npm run build
   ```

   Fix any type errors before committing.

2. **Run ESLint**

   ```bash
   npm run lint
   ```

   Ensure code quality standards are met.

3. **Verify no console errors**
   - Run `npm run dev` and check browser console
   - Test component interactions manually

4. **Commit message format**

   ```
   type(scope): description

   Example: feat(TransactionForm): add date validation
   ```

## Common Issues & Fixes

| Issue                       | Fix                                                      |
| --------------------------- | -------------------------------------------------------- |
| Type error on event handler | Use specific event type: `ChangeEvent<HTMLInputElement>` |
| `parseFloat` error          | Use `Number.parseFloat()` instead                        |
| FormEvent deprecated        | Use native event types from React                        |
| String instead of number    | Ensure amount is converted: `Number.parseFloat(value)`   |
| Key warnings on lists       | Use stable ID or unique value, never index               |

## Project Structure Reference

- **App.tsx** - Main orchestrator (state management, filtering)
- **Summary.tsx** - Income/expenses/balance display
- **SpendingByCategory.tsx** - Recharts visualization
- **TransactionForm.tsx** - Add transaction form
- **TransactionFilters.tsx** - Filter UI controls
- **TransactionTable.tsx** - Transaction list display
- **types.ts** - Shared interfaces

All types and interfaces should be consistent across components.

## Resources

- TypeScript strict mode: [tsconfig.json](../../../tsconfig.json)
- ESLint rules: [eslint.config.js](../../../eslint.config.js)
- Build tool: Vite ([vite.config.ts](../../../vite.config.ts))
- Project guidelines: [AGENTS.md](../../../AGENTS.md)
