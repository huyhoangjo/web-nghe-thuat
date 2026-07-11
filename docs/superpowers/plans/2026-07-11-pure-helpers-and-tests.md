# Pure Helpers & Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create pure logic helper functions for filtering paintings, calculating cart total, and generating Zalo checkout links, and write automated unit tests to verify their behavior.

**Architecture:** We will create standard JavaScript modules using ES module exports (`export function`) in `js/helpers.js`. We will verify these functions using Node.js's native `assert` module in a test runner script `tests/helpers.test.js`. We will configure `package.json` with ES module support so `node` can execute tests cleanly.

**Tech Stack:** JavaScript (ES Modules), Node.js, `assert` module.

## Global Constraints

- Create files exactly at `js/helpers.js` and `tests/helpers.test.js`.
- Add `"type": "module"` and `test` script running `node tests/helpers.test.js` to `package.json`.
- Git commit changes.
- Write a final report to `d:\WEB Nghe Thuat\.superpowers\sdd\task-2-report.md`.

---

### Task 1: Create Helpers Module

**Files:**
- Create: `js/helpers.js`

**Interfaces:**
- Produces:
  - `filterPaintings(paintings, category, priceRange)`
  - `calculateCartTotal(cartItems)`
  - `generateZaloLink(phoneNumber, cartItems)`

- [ ] **Step 1: Write helper logic**
  Write the functions for filtering, totaling, and generating Zalo checkout links in `js/helpers.js`.

### Task 2: Create Automated Unit Tests

**Files:**
- Create: `tests/helpers.test.js`

**Interfaces:**
- Consumes:
  - `filterPaintings(paintings, category, priceRange)` from `../js/helpers.js`
  - `calculateCartTotal(cartItems)` from `../js/helpers.js`
  - `generateZaloLink(phoneNumber, cartItems)` from `../js/helpers.js`

- [ ] **Step 1: Create test assertions**
  Write tests in `tests/helpers.test.js` importing functions and using Node's assert module to verify correctness.

### Task 3: Setup package.json and Run Tests

**Files:**
- Create/Modify: `package.json`

- [ ] **Step 1: Create package.json file**
  Configure package.json to run the tests with `"type": "module"` and `"scripts": { "test": "node tests/helpers.test.js" }`.

- [ ] **Step 2: Run automated tests**
  Execute `npm run test` or `npm test` and verify that the output displays `--- TẤT CẢ KIỂM THỬ ĐÃ ĐẠT! ---`.

### Task 4: Git Version Control and Report

**Files:**
- Modify: git tracking
- Create: `d:\WEB Nghe Thuat\.superpowers\sdd\task-2-report.md`

- [ ] **Step 1: Stage and commit new files**
  Run `git add` and `git commit` to commit `js/helpers.js`, `tests/helpers.test.js`, and `package.json`.

- [ ] **Step 2: Write final report**
  Create `d:\WEB Nghe Thuat\.superpowers\sdd\task-2-report.md` documenting the results.
