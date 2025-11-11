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

All styling through theme tokens. Never use magic numbers or hard-coded colors. Token values are placeholders that evolve during UI development - the token architecture and system is what matters. The goal is a global theme object with semantic properties accessible throughout the app. Token categories include theme.colors for all colors with semantic names, theme.spacing for all spacing values, theme.typography for font properties, and theme.textStyles for pre-built text combinations.

### 2. SEMANTIC NAMING

Purpose-driven naming not literal. Components use PascalCase.tsx. Files use camelCase. Style names describe purpose not appearance. Names should communicate intent and role in the application, not visual characteristics that may change. A button variant called actionDanger communicates what it does, while redButton only describes current appearance. Hooks always start with "use" prefix. Service files end with Service suffix. Type files end with .types.ts extension.

### 3. TYPESCRIPT STRICT

No any types. Type everything explicitly. Use type over interface for React Native convention. All component props must have explicit type definitions declared before the component. Function parameters and return types should be typed. Generic types should be used where appropriate for reusability. TypeScript's strict mode catches errors at compile time rather than runtime, making the codebase more maintainable and self-documenting.

### 4. CONTEXT PATTERN

Expose contexts via custom hooks only. Never use useContext directly. Memoize values and callbacks. Create the context, build the provider component with useState or useReducer for state management, wrap all callbacks with useCallback to prevent unnecessary re-renders, wrap the context value object with useMemo for the same reason, and finally export a custom hook that consumes the context and throws an error if used outside the provider. This pattern ensures type safety, prevents accidental usage outside provider boundaries, and optimizes performance.

### 5. CLEAR SECTION HEADERS

Organize all files with clear section headers using triple-equals comment format. Every component and module should have consistent sections that make code navigation predictable. File structure should follow this pattern: file header with component name and description, imports section, TYPES section for all type definitions, COMPONENT section containing the main export, STATE subsection for useState and useReducer, HOOKS subsection for custom hooks and side effects, EVENT HANDLERS subsection for callback functions, RENDER subsection for JSX return, and STYLES section at the bottom with StyleSheet.create. This consistent organization allows developers to quickly locate specific code sections.

### 6. SERVICE LAYER

Never query backend from components. Always through service layer. Business logic lives in service files, not in components or contexts. Services handle all direct communication with Supabase or other backends, process and transform data, handle errors, and return clean data or throw meaningful errors. Context layer calls services and manages state. Component layer consumes context via custom hooks and focuses purely on UI rendering and user interaction. This separation of concerns makes testing easier, keeps components focused, and allows backend changes without touching UI code.

### 7. ABSOLUTE IMPORTS

Use @/ aliases for all imports. Never use relative paths. Absolute imports make refactoring easier since moving files doesn't break import paths. They make code more readable by showing exactly where imports come from. They prevent deeply nested relative path chains that are hard to follow. Configuration exists in both tsconfig.json for TypeScript compilation and babel.config.js for Metro bundler runtime resolution. Common aliases include @/ for src root, @components for shared components, @features for feature modules, @theme for design tokens, @services for global services, and @types for global types.

### 8. FEATURE-BASED STRUCTURE

Organize by feature not file type. Each feature has screens/ components/ context/ services/ types/ subfolders. Related code lives together rather than scattered across global folders. Features are self-contained modules that can be understood, tested, and modified independently. Shared code that truly needs global access lives in src/components, src/hooks, src/utils, or src/services. Everything else belongs in a feature folder. This structure scales better as applications grow and makes it clear what code is related to what functionality.

### 9. GLOBAL-FIRST PATTERN

Establish global files first for all reusable patterns before creating local customizations. Repeated elements like buttons, selectors, inputs, text sizes, spacing, and visual rhythm must be defined in global files as established patterns. Common UI components flow through src/components or src/theme as the single source of truth. Only after global patterns are established should local customizations be added at the feature or component level. This ensures consistency across the app, reduces duplication, makes updates easier by changing one file instead of many, and creates a predictable system where developers know where to find standard implementations. Global patterns include button variants in theme.buttons, input field styling, common spacing rhythms, standard text sizes, reusable component wrappers, and shared interaction patterns. Local customizations are acceptable only when a specific feature truly needs deviation from the global standard.

### 10. FORWARD-LOOKING COMMENTS

Code comments must explain design intent and purpose, never document historical changes or past fixes. Comments should be forward-looking documentation that helps future developers understand why code exists and how it should be used, not a changelog of what was modified or adjusted. Instead of "Changed from 50dp to 64dp to fix alignment issue" write "64dp safe zone clearance for system UI compatibility". Instead of "Fixed bug where button was too close to edge" write "32dp horizontal padding ensures comfortable touch targets". Comments describe the current state and its rationale, treating the codebase as the authoritative present. Historical context belongs in git history and version control, not in code comments. This keeps code clean, focused on present intent, and prevents comments from becoming stale historical artifacts that confuse rather than clarify.

---

## CRITICAL REMINDERS

NO magic numbers, NO hard-coded colors, NO relative imports, NO any types, NO direct database queries, NO historical comments.
ALWAYS use design tokens, ALWAYS establish global patterns first, ALWAYS use service layer, ALWAYS memoize contexts, ALWAYS use custom hooks, ALWAYS write forward-looking comments.

---

Standards can be refined after-the-fact. Progress comes first.
