# CLAUDE DEVELOPMENT STANDARDS

## Purpose

Development standards for Lift 3-2-1 React Native + TypeScript app. Apply during implementation but never block progress.

---

## CORE PHILOSOPHY

SUPER STUPID SIMPLE (SSS): Effortless user experience. Remove complexity, avoid feature creep.
REMOVE DON'T ADD: When faced with complexity, simplify or remove.
Mobile-first: Touch-optimized, immediate UI responses.

---

## STANDARDS

### 1. DESIGN TOKEN SYSTEM

All styling through theme tokens. Never use magic numbers or hard-coded colors. Token values are placeholders that evolve during UI development.

### 2. SEMANTIC NAMING

Purpose-driven naming not literal. Components use PascalCase.tsx. Files use camelCase. Style names describe purpose not appearance.

### 3. TYPESCRIPT STRICT

No any types. Type everything explicitly. Use type over interface.

### 4. CONTEXT PATTERN

Expose contexts via custom hooks only. Never use useContext directly. Memoize values and callbacks.

### 5. SERVICE LAYER

Never query backend from components. Always through service layer.

### 6. ABSOLUTE IMPORTS

Use @/ aliases for all imports. Never use relative paths.

### 7. FEATURE-BASED STRUCTURE

Organize by feature not file type. Each feature has screens/ components/ context/ services/ types/ subfolders.

---

## CRITICAL REMINDERS

NO magic numbers, NO hard-coded colors, NO relative imports, NO any types, NO direct database queries.
ALWAYS use design tokens, ALWAYS use service layer, ALWAYS memoize contexts, ALWAYS use custom hooks.

---

Standards can be refined after-the-fact. Progress comes first.
