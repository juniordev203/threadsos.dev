<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **threadsos.dev** (149 symbols, 136 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/threadsos.dev/context` | Codebase overview, check index freshness |
| `gitnexus://repo/threadsos.dev/clusters` | All functional areas |
| `gitnexus://repo/threadsos.dev/processes` | All execution flows |
| `gitnexus://repo/threadsos.dev/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

---

# Spec-Driven Development (SDD) Rules & Workflow

Every task (feature, refactor, bugfix, or structural change) in this project **MUST** strictly follow Spec-Driven Development. **NEVER** write code before documenting the specification and obtaining user approval.

## 1. Spec Doc First (Lưu vết Documentation trước khi Coding)
Before modifying or creating any codebase files:
- Create a Task Spec document under `docs/tasks/<YYYY-MM-DD>-<task-name>.md` (or update the relevant spec in `docs/`).
- The Spec Document MUST contain:
  1. **Goal & Scope:** Concise summary of what is being built/fixed and what is out of scope.
  2. **Technical Design & Affected Components:** Files to create, modify, or delete (`[NEW]`, `[MODIFY]`, `[DELETE]`), data models, and API/state changes.
  3. **Granular Commit Plan:** A numbered list of planned Git commits. Each commit item must detail:
     - Target files & changes.
     - Precise commit message format: `<type>(<scope>): [Spec X.Y] <description>`.
  4. **Verification Plan:** Exact test/build/runtime checks to prove correctness.

## 2. User Review & Approval
- Present the Task Spec document to the user.
- **STOP** and wait for explicit approval before proceeding to implementation.

## 3. Implementation with Commit Tracing
- Execute changes in strict accordance with the approved commit plan.
- Perform GitNexus `impact` analysis before modifying symbols and run `detect_changes()` before committing.
- Ensure every commit message clearly references its Spec step.

## 4. Completion & Spec Synchronization
- Update the Task Spec document with final status, verification results, and any deviations.
