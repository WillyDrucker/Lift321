# LIFT 3-2-1 PROJECT NOTES

## What This File Does

This is the comprehensive version history and changelog for the Lift 3-2-1 project. It provides a detailed record of what was built in each version, why decisions were made, what problems were solved, and what was learned. Each version entry documents features implemented, files created or modified, user decisions, technical challenges, and key learnings. This file grows with the project and maintains institutional knowledge across sessions. Older versions (3+ versions back) are condensed to 3-5 line summaries to keep the file manageable, while recent versions remain detailed for reference.

**IMPORTANT**: This file should ONLY contain summarized version history and high-level decisions. Exact code examples, detailed bug reproductions, and technical implementation details belong in CLAUDE_ACTIVE.md. Only store code references here if they document absolutely critical bugs or solutions that must be preserved long-term.

## Purpose

This file contains the historical record of version changes for Lift 3-2-1. Detailed changelog information can be added here as work progresses. When the file grows too large, older versions will be condensed to 2-3 line summaries to keep the file manageable. Recent versions (current phase of work) remain detailed. For current architectural patterns and session state, see CLAUDE_SESSION_HANDOFF.md.

**Documentation Flow**: Items too detailed for CLAUDE_SESSION_HANDOFF.md are summarized there with full details provided here. Items too big for PROJECT_NOTES can overflow to CLAUDE_ACTIVE.md as an extension.

---

## Version History

### v1.1.5 - Data-Driven Exercise System & Dynamic Duration (2025-01-22)
**Branch**: Claude-v1.1.5

**Summary**: Created complete data-driven exercise system with duration calculator utility implementing rest/workout/warmup formula, exercise service for session type filtering (Lift 3-2-1 logic), and full WorkoutOverviewScreen refactor eliminating 180+ lines of hardcoded JSX. Duration formula (totalSets × 6) - 2 produces accurate estimates: 34 minutes (Standard 6 sets), 28 minutes (Express 5 sets), 22 minutes (Maintenance 4 sets). Exercise service implements session logic: Standard (3+2+1 sets), Express (3+2), Maintenance (2+2). Added session color tokens to theme (sessionStandard/Express/Maintenance). Dynamic vertical line height adapts to exercise count. Applied CLAUDE_DEV_STANDARDS to all files with proper section headers and forward-looking comments.

**What Was Built**:
- **Duration Calculator Utility** (src/utils/durationCalculator.ts):
  - **Formula**: `(totalSets × 5) + totalSets + 3 - 5 = (totalSets × 6) - 2`
  - **Components**:
    - Rest time: totalSets × 5 minutes (5 min rest per set at 10 reps)
    - Workout time: totalSets × 1 minute (1 min per exercise set)
    - Warmup time: 3 minutes (fixed warmup period)
    - Final rest removal: -5 minutes (no rest after completing final set)
  - **Results**:
    - Standard (6 sets): (6×5) + 6 + 3 - 5 = 34 minutes
    - Express (5 sets): (5×5) + 5 + 3 - 5 = 28 minutes
    - Maintenance (4 sets): (4×5) + 4 + 3 - 5 = 22 minutes
  - **Exports**:
    - `calculateWorkoutDuration(params)`: Full calculation with breakdown
    - `getWorkoutDuration(totalSets)`: Simple helper returning just minutes
  - **Types**: DurationParams, DurationResult with breakdown details
  - **File Header**: Complete documentation with purpose, formula breakdown, examples

- **Exercise Service** (src/services/exerciseService.ts):
  - **Core Functionality**:
    - Loads exercises from src/data/exercises.json
    - Filters by body part (Chest, Back, Legs, Arms, Shoulders)
    - Filters by session type (Standard/Express/Maintenance)
    - Returns processed exercises with adjusted set counts
  - **Session Type Logic**:
    - Standard: Include Major1 (3 sets) + Minor1 (2 sets) + Tertiary (1 set) = 6 total
    - Express: Include Major1 (3 sets) + Minor1 (2 sets), exclude Tertiary = 5 total
    - Maintenance: Limit Major1 to 2 sets, Minor1 to 2 sets, exclude Tertiary = 4 total
  - **Key Functions**:
    - `getExercisesForWorkout(bodyPart, sessionType)`: Main data loading function
    - `getAllBodyParts()`: Get unique list of body parts
    - `getExerciseSetCount(bodyPart, sessionType)`: Quick set count without full data
  - **Helper Functions**:
    - `filterByBodyPart()`: Extract exercises for specific body part
    - `groupByMuscleGroup()`: Organize exercises by Major1/Minor1/Tertiary
    - `selectExerciseFromGroup()`: Pick one exercise from each group
    - `processExercise()`: Apply session type limits to exercise sets
  - **Types**:
    - `SessionType`: 'Standard' | 'Express' | 'Maintenance'
    - `ProcessedExercise`: Exercise + adjustedSets + originalSets
    - `ExerciseServiceResult`: exercises, totalSets, sessionType, bodyPart, breakdown
  - **Future Expansion**: Equipment filtering prepared but not implemented (selects first exercise from each group currently)

- **WorkoutOverviewScreen Refactoring**:
  - **Hardcoded Removal** (src/features/workout/screens/WorkoutOverviewScreen.tsx):
    - Eliminated 180+ lines of hardcoded exercise JSX
    - Removed all inline exercise definitions (3 sets bench, 2 sets incline, 1 set flyes)
    - Replaced with dynamic data loading from exerciseService
  - **Dynamic Features**:
    - **Duration Calculation**: Updates automatically when session type changes
    - **Exercise Rendering**: renderExercises() helper builds tree from loaded data
    - **Set Rendering**: renderExerciseSets() creates all sets for each exercise
    - **Vertical Line Height**: Dynamically calculated based on exercise count
    - **Session Type Conversion**: Converts lowercase UI state to PascalCase SessionType
  - **New Imports**:
    - `getExercisesForWorkout, SessionType` from @/services/exerciseService
    - `getWorkoutDuration` from @/utils/durationCalculator
    - `useMemo` from React for computed values
  - **Computed Values**:
    - `sessionType`: PascalCase conversion of selectedSession
    - `workoutData`: Loaded exercises filtered by body part and session type
    - `workoutDuration`: Calculated duration based on total sets
    - `verticalLineHeight`: Dynamic height based on exercise count with offsets
  - **Helper Functions**:
    - `getExerciseImage(exerciseName)`: Maps exercise names to image assets
    - `renderExerciseSets(exerciseName, totalSets, currentReps)`: Renders all sets for one exercise
    - `renderExercises()`: Renders all exercise groups with spacers
  - **Constants** (for vertical line calculation):
    - START_OFFSET: 25dp (connects with title connector)
    - SET_HEIGHT: 50dp (height of each exercise row)
    - SET_MARGIN: 5dp (margin between sets)
    - GROUP_SPACER: 32dp (spacer between exercise groups)

- **Theme Token Enhancement** (src/theme/colors.ts):
  - **New Session Color Tokens**:
    - `sessionStandard: '#00FF00'` - Pure green for standard workouts
    - `sessionExpress: '#77FF00'` - Olive green for express workouts
    - `sessionMaintenance: '#FFFF00'` - Yellow for maintenance workouts
  - **Usage**: Replaced all hardcoded #77ff00 and #ffff00 hex values throughout WorkoutOverviewScreen
  - **Pattern**: Semantic color naming for session types (not literal color names)
  - **Documentation**: Added "SESSION TYPE COLORS" section with purpose/usage comments

- **CLAUDE_DEV_STANDARDS Compliance**:
  - **Section Headers**: Changed === format to ============ throughout WorkoutOverviewScreen
  - **Comments**: All forward-looking (design intent, not historical changes)
  - **Magic Numbers**: Eliminated with named constants (START_OFFSET, SET_HEIGHT, etc.)
  - **File Headers**: All new files have proper headers with purpose and dependencies
  - **Forward-Looking**: Replaced "Testing with very large padding" → "Extra bottom padding ensures content clears navigation"

**Why This Approach**:
- **Service Layer Pattern**: Never query JSON directly from components - always via service layer for testability and reusability
- **Duration Formula Accuracy**: Accounts for all workout components (rest, exercise, warmup) and removes unnecessary final rest period
- **Session Type Math**: Lift 3-2-1 naming directly maps to Standard session (3 Major, 2 Minor, 1 Tertiary)
- **Dynamic Rendering**: Single renderExercises() function handles all session types without conditional JSX
- **Vertical Line Calculation**: Formula-based approach adapts automatically to any exercise count
- **Theme Token Centralization**: All session colors in theme.colors enables consistent usage across app
- **Computed Values**: useMemo prevents unnecessary recalculation on re-renders
- **Type Safety**: SessionType ensures only valid values ('Standard'/'Express'/'Maintenance')

**Problems Solved**:
1. **Hardcoded Exercise Data**: Screen had 180+ lines of hardcoded JSX defining exercises. **Solution**: Exercise service loads from exercises.json with type-safe filtering.

2. **Manual Duration Calculation**: Duration was hardcoded (31/25/19 minutes) without formula. **Solution**: Duration calculator implements precise formula based on total sets, updating automatically.

3. **Session Type Duplication**: Exercise lists duplicated across session types with manual adjustments. **Solution**: Single data source with session type filtering in service layer.

4. **Fixed Vertical Line**: Tree line height hardcoded for 6-set Standard workout. **Solution**: Dynamic calculation based on actual exercise count and spacing constants.

5. **Hardcoded Session Colors**: Inline #77ff00 and #ffff00 hex values throughout. **Solution**: Theme tokens sessionExpress and sessionMaintenance for semantic usage.

6. **No Equipment Filtering**: Service needed equipment selection logic. **Solution**: Prepared equipment filtering structure (TODO: implement in selectExerciseFromGroup).

7. **Hardcoded Rep Counts**: All sets showing 10 reps regardless of week/plan. **Solution**: Prepared for plans.json integration (TODO: load rep counts based on week).

**What Changed**:
- **New Files**:
  - `src/utils/durationCalculator.ts`: Duration calculation utility with formula
  - `src/services/exerciseService.ts`: Exercise data loading and filtering service

- **Modified Files**:
  - `src/features/workout/screens/WorkoutOverviewScreen.tsx`:
    - Added imports: exerciseService, durationCalculator, useMemo
    - Added computed values: sessionType, workoutData, workoutDuration, verticalLineHeight
    - Added helper functions: getExerciseImage, renderExerciseSets, renderExercises
    - Removed 180+ lines of hardcoded exercise JSX
    - Updated duration display to use dynamic workoutDuration
    - Made vertical line height dynamic via inline style
    - Updated all hardcoded colors to theme tokens
    - Applied CLAUDE_DEV_STANDARDS section headers
  - `src/theme/colors.ts`:
    - Added SESSION TYPE COLORS section
    - Added sessionStandard/Express/Maintenance tokens
    - Added documentation for each color

**User Decisions**:
- Duration formula uses (totalSets × 6) - 2 pattern for simplicity
- Rest time is 5 minutes per set (based on 10-rep sets)
- Workout time is 1 minute per set
- Warmup time is fixed 3 minutes
- Final rest period removed from total (workout ends after last set completes)
- Session types follow Lift 3-2-1 pattern: 3-2-1 (Standard), 3-2 (Express), 2-2 (Maintenance)
- Exercise service selects first exercise from each muscle group (equipment filtering deferred)
- Rep counts currently 10 for all sets (plans.json integration deferred)
- Vertical line height calculated with formula (START_OFFSET + exercise heights - adjustments)
- All session-specific colors belong in theme.colors as semantic tokens
- Image mapping limited to chest exercises (bench-press, incline-bench-press, chest-flyes)

**Key Learnings**:
- **Service Layer Benefits**: Separating data loading from UI components enables:
  - Unit testing of data logic
  - Reusable filtering across multiple screens
  - Centralized data access patterns
  - Easier future equipment/rep count integration

- **Dynamic Calculation Patterns**: Computed values with useMemo provide:
  - Automatic updates when dependencies change
  - Performance optimization (no unnecessary recalculations)
  - Clear data flow (state → computed → render)
  - Type safety throughout chain

- **Formula-Based Layout**: Calculating vertical line height with constants enables:
  - Automatic adaptation to exercise count changes
  - Easy adjustment via constant updates
  - Self-documenting layout math
  - Elimination of magic numbers

- **Theme Token Migration**: Moving inline colors to theme.colors provides:
  - Single source of truth for colors
  - Semantic naming (sessionStandard vs #00FF00)
  - Easy theme changes
  - Consistent color usage across app

- **Hardcoded Data Elimination**: Removing 180+ lines of JSX proves:
  - Data belongs in JSON, not component code
  - Dynamic rendering is more maintainable
  - Service layer is worth initial setup cost
  - Type safety catches data structure changes early

- **Duration Formula Design**: Breaking formula into components makes it:
  - Easy to understand (rest + workout + warmup - final rest)
  - Easy to test individual components
  - Easy to adjust parameters (change rest time per set)
  - Self-documenting with clear variable names

- **Session Type Architecture**: Lift 3-2-1 naming directly maps to data structure:
  - 3 = Major1 sets in Standard
  - 2 = Minor1 sets in Standard
  - 1 = Tertiary sets in Standard
  - Express/Maintenance modify this pattern logically
  - Name reinforces workout structure understanding

**Next Steps**:
- Implement equipment filtering in exerciseService.selectExerciseFromGroup()
- Integrate rep count progression from plans.json based on current week
- Expand image mapping to cover all exercises (not just chest)
- Add session persistence (AsyncStorage) for user selections
- Build workout session tracking with real-time duration logging
- Create exercise detail screens
- Implement actual workout session flow with set completion tracking

---

### v1.1.4 - Font Management & Title Bar Refinements (2025-01-19)
**Branch**: Claude-v1.1.4

**Summary**: Reorganized all font assets from root-level `assets/fonts/` to `src/assets/fonts/` for consistency with image and video assets. Applied Zuume-ExtraBold custom font to workout titles with 20% horizontal scaling (scaleX: 1.2) and margin compensation for transform shift. Refined WorkoutOverviewScreen title bar to 66dp height with perfectly balanced 100x50dp "LET'S GO!" button. Added dynamic duration selector displaying color-coded session lengths (green/olive/yellow). Changed all selector text to light gray for improved visual hierarchy. Discovered critical custom font constraint (fontWeight breaks font loading) and rendering pattern (translateY for vertical positioning, not marginTop). Updated all modified files with complete CLAUDE_DEV_STANDARDS compliance.

**What Was Built**:
- **Font Asset Reorganization**:
  - Moved all 8 font files from `assets/fonts/` to `src/assets/fonts/`
  - Updated `react-native.config.js` to point to new location: `assets: ['./src/assets/fonts']`
  - Re-linked fonts with `npx react-native-asset` to regenerate link manifests
  - Deleted empty `assets/` folder after migration
  - All assets now consistently under `src/assets/` structure (fonts, images, videos)
  - Added proper file header to react-native.config.js with purpose and usage

- **Zuume-ExtraBold Font Integration**:
  - **HomePage WorkoutCard** (src/components/WorkoutCard.tsx):
    - Applied Zuume-ExtraBold to body part titles (CHEST, ARMS, SHOULDERS, etc.)
    - Font: 32dp (`theme.typography.fontSize.xxxl`)
    - Transform: `scaleX: 1.2` (20% wider for enhanced visual impact)
    - Margin: `marginLeft: 6` (compensates for scaleX left shift to maintain 16dp alignment)
    - Property: `includeFontPadding: false` (removes Android font padding)
    - **Critical**: Removed `fontWeight` property (breaks custom font loading)

  - **WorkoutOverviewScreen Title Bar** (src/features/workout/screens/WorkoutOverviewScreen.tsx):
    - Applied Zuume-ExtraBold to "CHEST" title text
    - Font: 32dp (`theme.typography.fontSize.xxxl`)
    - Transform: `[{scaleX: 1.2}, {translateY: 1}]` (20% wider + 1dp optical centering)
    - Margin: `marginLeft: 14` (8dp bar padding + 6dp scaleX compensation)
    - **Critical**: translateY avoids sub-pixel rendering artifacts from marginTop + scaleX combination

- **Title Bar Architecture Refinement**:
  - **Title Bar Dimensions**:
    - Height: 48dp → 66dp (accommodates 50dp button with 8dp top/bottom spacing)
    - Padding: 8dp horizontal (`theme.spacing.s`)
    - Background: `theme.colors.backgroundPrimary`
    - Border: 1dp green bottom border (`theme.layout.border.thin`, `theme.colors.actionSuccess`)

  - **"CHEST" Text**:
    - Position: 16dp from left edge (8dp padding + 14dp margin - 6dp scaleX shift)
    - Vertical: translateY: 1 for optical centering
    - Font: Zuume-ExtraBold 32dp with scaleX: 1.2

  - **"LET'S GO!" Button**:
    - Dimensions: 100dp x 50dp (matches HomePage "BEGIN" button exactly)
    - Position: 8dp from right/top/bottom edges
    - Font: Roboto 20dp Bold (theme.typography.fontFamily.primary + fontWeight.bold)
    - Color: Black text on green background
    - Multi-layer shadow system (3 layers at -2dp, -4dp, -6dp)

  - **Scroll Content Adjustment**:
    - paddingTop: Updated from `64 + 48 + 8` to `64 + 66 + 8` (138dp total)
    - Accommodates new 66dp title bar height

- **Duration Selector Implementation**:
  - Dynamic 50dp black selector box between "Current Session" text and session type selectors
  - Displays "DURATION: XX MINUTES" with session-based values and colors
  - **Session Duration Mapping**:
    - Standard: "31 MINUTES" in green (#00FF00)
    - Express: "25 MINUTES" in olive (#77ff00)
    - Maintenance: "19 MINUTES" in yellow (#ffff00)
    - (Advanced: "55 MINUTES" prepared for future)
  - **Styling**:
    - Text: 16dp (`theme.typography.fontSize.m`)
    - Label: "DURATION:" in white (`theme.colors.textPrimary`)
    - Value: Color changes dynamically based on `selectedSession` state
    - Layout: Centered in 50dp selector box
  - **Spacing**:
    - marginBottom: 8dp from "Current Session" text
    - marginTop: 8dp from session type selectors below

- **Visual Hierarchy Improvements**:
  - Changed all selector text from white to light gray (#B0B0B0 - `theme.colors.textSecondary`)
  - Affected selectors:
    - Plan focus: STRENGTH / BALANCED / GROWTH
    - Session types: STANDARD / EXPRESS / MAINTENANCE
    - Equipment types: ALL WEIGHTS / FREE WEIGHTS / MACHINES / BANDS / BODYWEIGHT
  - Creates visual contrast between:
    - Interactive selectors (light gray)
    - Display labels (darker gray #424242)
    - Dynamic values (colored)

- **Spacing Precision Refinements**:
  - **Font Metrics Compensation**:
    - "Current Plan/Session/Equipment" text: marginTop/Bottom changed from 16dp to 13dp
    - Compensates for ~3dp intrinsic font metrics (ascent/descent)
    - Achieves visual 16dp spacing (13dp margin + 3dp font metrics)
    - Pattern: `lineHeight` matching `fontSize` + `includeFontPadding: false` + margin compensation

  - **Progress Bar Spacing**:
    - Week text ("WEEK 2 OF 15"): Removed marginLeft (card padding provides 8dp from edge)
    - Progress bar container: Removed marginRight (card padding provides 8dp from edge)
    - Gap between text and bar: Increased from 8dp to 16dp for better readability
    - Total layout: 8dp edge | text | 16dp gap | progress bar | 8dp edge

- **CLAUDE_DEV_STANDARDS Compliance**:
  - **typography.ts**:
    - Updated workoutCard comment from "Hyphen version" (historical/technical) to "Zuume ExtraBold for large bold workout headings" (forward-looking purpose)

  - **react-native.config.js**:
    - Added comprehensive file header explaining configuration purpose
    - Added inline comment describing font assets configuration
    - Follows triple-equals header format standard

  - **WorkoutOverviewScreen.tsx**:
    - All comments are forward-looking (describe purpose and design intent)
    - Clear section organization maintained
    - No historical change references

**Why This Approach**:
- **Font Consolidation**: All assets under `src/assets/` creates predictable, consistent structure matching other static resources (images, videos)
- **20% Width Scaling**: Zuume-ExtraBold is condensed font; scaleX: 1.2 provides better readability and visual presence for workout titles
- **Margin Compensation**: scaleX transform scales from center, shifting left edge leftward; marginLeft compensates to maintain desired alignment
- **translateY Over marginTop**: marginTop + scaleX causes sub-pixel rendering artifacts where individual letters appear at different heights; translateY applied within transform array avoids this
- **66dp Title Bar**: Math: 8dp + 50dp button + 8dp = 66dp perfectly balanced
- **100dp Button Width**: Matches HomePage "BEGIN" button for visual consistency; "LET'S GO!" text fits comfortably at 20dp
- **Dynamic Duration Colors**: Color-coding provides immediate visual feedback on session intensity/length deviation
- **Light Gray Selectors**: Creates visual hierarchy - interactive elements recede, display text and dynamic values stand out
- **13dp Margin Compensation**: Roboto font has intrinsic ascent/descent spacing (~3dp); reducing margin from 16 to 13 achieves visual 16dp spacing

**Problems Solved**:
1. **Font Asset Confusion**: Root-level `assets/fonts/` separate from `src/assets/images/` created inconsistent structure. Unified under `src/assets/` provides single source of truth.

2. **Custom Font Not Loading**: Applied `fontWeight: bold` to Zuume-ExtraBold caused React Native to search for "Zuume-ExtraBold-Bold" variant (doesn't exist), falling back to system font. **Solution**: Omit fontWeight entirely for custom fonts - font file contains weight.

3. **Title Bar Height Arbitrary**: Initial 50dp set without calculation. **Solution**: Calculated 66dp = 8 + 50 + 8 for mathematically perfect balance.

4. **Uneven Letter Heights**: Combining `marginTop: 1` with `scaleX: 1.2` caused sub-pixel rendering artifacts where "C" and "S" in "CHEST" appeared higher than "H", "E", "T". **Solution**: Use `translateY: 1` in transform array instead of marginTop.

5. **Button Width Mismatch**: Initial 50dp width looked cramped for "LET'S GO!" text. **Solution**: Changed to 100dp to match HomePage "BEGIN" button dimensions.

6. **Text Spacing 19dp Instead of 16dp**: User measured 57 pixels (19dp at 3x density) but design called for 16dp. Roboto font has ~3dp intrinsic spacing. **Solution**: Reduced marginTop/Bottom from 16 to 13, achieving visual 16dp.

7. **Progress Bar Spacing 48 Pixels**: User measured 48 pixels (16dp) from left edge to week text, but design called for 8dp. **Solution**: Removed marginLeft from week text and marginRight from progress bar - card padding provides 8dp from edges. Increased gap between text and bar to 16dp for readability.

**What Changed**:
- **New Files**: None (all modifications)

- **Modified Files**:
  - `src/assets/fonts/` (new directory): Moved all 8 fonts here
  - `react-native.config.js`: Updated assets path, added file header
  - `src/theme/typography.ts`: Updated workoutCard comment, verified font family name
  - `src/components/WorkoutCard.tsx`: Applied Zuume-ExtraBold, scaleX: 1.2, marginLeft: 6, includeFontPadding: false, removed fontWeight
  - `src/features/workout/screens/WorkoutOverviewScreen.tsx`:
    - Title bar: Height 66dp, padding 8dp
    - "CHEST" text: Zuume-ExtraBold 32dp, scaleX: 1.2, translateY: 1, marginLeft: 14
    - "LET'S GO!" button: 100x50dp, Roboto 20dp Bold
    - Duration selector: New 50dp box with dynamic color-coded duration
    - All selector text: Changed to light gray (#B0B0B0)
    - "Current" labels: Margin compensation 13dp (visual 16dp)
    - Progress bar: Removed edge margins, increased gap to 16dp
    - Scroll content: Updated paddingTop for new title bar height

- **Asset Reorganization**:
  - Deleted: `assets/fonts/` (empty after migration)
  - Deleted: `assets/` (empty after fonts/ removal)
  - Updated: `android/link-assets-manifest.json` (new font paths)
  - Updated: `ios/link-assets-manifest.json` (new font paths)

**User Decisions**:
- Font assets belong in `src/assets/fonts/` (not root `assets/`)
- Custom fonts must NOT use `fontWeight` property (breaks font loading)
- Title bar is 66dp to accommodate 50dp button with 8dp spacing
- "LET'S GO!" button is 100dp wide (matches "BEGIN" button)
- Workout title font is Zuume-ExtraBold with scaleX: 1.2 (20% wider)
- Duration colors: green (standard), olive (express), yellow (maintenance)
- All selector text is light gray (#B0B0B0) for visual hierarchy
- Use translateY for vertical positioning (NOT marginTop - causes rendering artifacts)
- Text spacing uses margin compensation for font metrics (13dp margin = 16dp visual)
- Progress bar has 16dp gap from week text, 8dp from edges

**Key Learnings**:
- **Custom Font Loading**: React Native font system interprets fontWeight as request for font variant. Specifying `fontWeight: 'bold'` on "Zuume-ExtraBold" font tries to load "Zuume-ExtraBold-Bold" (doesn't exist) → fallback to system font. **Pattern**: Omit fontWeight entirely for custom fonts.

- **Transform Rendering**: Combining `marginTop` with `scaleX` transform causes sub-pixel rendering artifacts where individual letters render at different vertical positions. **Pattern**: Use `translateY` in transform array instead of marginTop for vertical positioning.

- **Font Intrinsic Metrics**: All fonts have ascent/descent/line-gap metadata that adds visual spacing beyond specified fontSize. Roboto adds ~3dp. **Pattern**: `lineHeight === fontSize` + `includeFontPadding: false` + margin compensation (13dp margin achieves 16dp visual).

- **Asset Organization**: Keeping all static assets (fonts, images, videos) under unified `src/assets/` structure provides:
  - Consistent import pattern (@/assets/*)
  - Single location for all static resources
  - Cleaner project root
  - Easier mental model

- **Optical Centering**: Mathematical centering doesn't always look centered due to font metrics. 66dp bar with 32dp text = 17dp top/bottom mathematically, but looks high. 1dp translateY adjustment achieves optical balance.

- **Button Sizing Consistency**: Interactive elements should maintain consistent dimensions across screens. "BEGIN" button is 100dp wide → "LET'S GO!" button should match for visual coherence.

- **Visual Hierarchy Through Color**: Light gray selectors (#B0B0B0) recede visually, allowing display labels (#424242) and dynamic colored values (green/olive/yellow) to stand out. Creates clear information hierarchy without additional visual weight.

- **Precision Measurement**: When user reports spacing discrepancy (measured 19dp vs expected 16dp), trust the measurement. Font metrics are real and require compensation. Don't dismiss as measurement error.

**Next Steps**:
- Exercise list and detail screens
- Workout session flow with set tracking
- State persistence for user selections (AsyncStorage)
- Connect real workout data to selectors
- Implement actual duration calculations based on set counts

---

### v1.1.3 - WorkoutOverviewScreen Implementation (2025-01-18)
**Branch**: Claude-v1.1.3

**Summary**: Built complete WorkoutOverviewScreen with 4-card selector system (Title, Plan, Session, Equipment) adapting to all workout types. Implemented sophisticated multi-selector logic with "All Weights" toggle behavior and intelligent first-click guidance. Enhanced TopNavBar with optional back button integrated into navigation bar. Standardized 8dp spacing throughout all cards with 1dp selector gaps. Applied complete CLAUDE_DEV_STANDARDS compliance including named constants, forward-looking comments, and semantic naming refactor.

**What Was Built**:
- **WorkoutOverviewScreen** (src/features/workout/screens/WorkoutOverviewScreen.tsx):
  - Generic screen accepts workoutType param and adapts content
  - Four-card architecture: Title (workout type), Plan (configuration), Session (type selection), Equipment (multi-toggle)
  - Full vertical scrolling between TopNav and BottomTabBar
  - Sidebar integration with hamburger menu
  - Navigation back button integrated in TopNavBar (not screen content)
  - All styling tokenized: SELECTOR_TEXT_SIZE constant, theme.layout.border.thin, theme.spacing.s/m
  - Proper section headers: TYPES, STATE, EVENT HANDLERS, RENDER, STYLES

- **Selector System Architecture**:
  - **Title Card**: 50dp black selector containing workout type (CHEST, ARMS, etc.) in green 32dp
  - **Plan Card**:
    - "CURRENT PLAN" label (24dp, subdued gray)
    - Plan name selector: "LIFT 3-2-1" with italic "LIFT" (24dp, green border)
    - Week progress: "WEEK 2 OF 15" with green numbers (24dp)
    - Focus selectors: Strength/Balanced/Growth (12dp, 1dp gaps, default: Balanced)
  - **Session Card**:
    - "CURRENT SESSION" label (24dp, subdued gray)
    - Type selectors: Standard/Express/Maintenance (12dp, 1dp gaps, default: Standard)
  - **Equipment Card**:
    - "CURRENT EQUIPMENT" label (24dp, subdued gray)
    - Equipment selectors in 2 rows: All Weights/Free Weights/Machines (row 1), Bands/Bodyweight (row 2)
    - Multi-line text: "ALL\nWEIGHTS", "FREE\nWEIGHTS"
    - 12dp text sizing for compact display

- **Equipment Selection Logic**:
  - Default state: All equipment types highlighted (all, free, machines, bands, bodyweight)
  - "All Weights" behavior: Selects all equipment types when pressed
  - Individual equipment first press when "All" active: Deselects "All" + all others, highlights only clicked item (guides user on how selectors work)
  - Individual equipment subsequent presses: Toggle on/off independently
  - Auto-highlight "All": When all 4 individual types manually selected, "All Weights" automatically highlights
  - Smart Set-based state management for efficient toggle operations

- **TopNavBar Enhancement** (src/components/Navigation/TopNavBar.tsx):
  - Added optional `onBackPress?: () => void` prop
  - Created leftButtonsContainer with hamburger + optional back button
  - Back button appears 16dp from hamburger when onBackPress provided
  - Conditional rendering: `{onBackPress && <BackButton />}`
  - 1dp white border added to navigation bar (theme.layout.border.thin)
  - Maintains component flexibility for screens with/without back navigation

- **Spacing Standardization**:
  - **8dp System**: All card margins (external), card padding (internal), card separation
  - **1dp System**: Selector gaps within same logical group (creates visual cohesion)
  - scrollContent padding: 8dp left/right, clears TopNav (64dp) + 8dp, clears BottomNav (68dp) + 8dp
  - No magic numbers: All values use theme tokens or named constants

- **Typography Consistency**:
  - **32dp**: Workout type titles (CHEST, workoutTitleText)
  - **24dp**: Primary labels (Current Plan/Session/Equipment), plan name, week progress (theme.typography.fontSize.xl)
  - **12dp**: All selectable options (SELECTOR_TEXT_SIZE constant for easy updates)
  - All text bold within cards (theme.typography.fontWeight.bold)
  - Multi-line support for compact selectors

- **CLAUDE_DEV_STANDARDS Compliance**:
  - Created SELECTOR_TEXT_SIZE constant (no magic 12)
  - All borderWidth uses theme.layout.border.thin (no magic 1)
  - Forward-looking comments: "Standard selector height for touch targets" vs "50dp height"
  - Semantic naming refactor: workoutPlanFocusSelector (not selector1), workoutSessionTypeSelector (not sessionBox)
  - Proper file headers with purpose, dependencies, usage
  - Organized sections: TITLE CARD, PLAN CARD, SESSION CARD, EQUIPMENT CARD
  - All styling via theme tokens

**Why This Approach**:
- **Four-Card System**: Logical separation of concerns (title, plan config, session type, equipment) creates clear mental model
- **8dp Standardization**: Consistent rhythm throughout app, easy to remember, touch-friendly spacing
- **1dp Selector Gaps**: Creates visual grouping while maintaining clear boundaries
- **12dp Text for Selectors**: Compact display allows multiple options in 50dp height while remaining readable
- **Equipment Toggle Logic**: First-press guidance teaches users the multi-select behavior pattern
- **Set-Based State**: Efficient toggle operations, easy to check membership, clean add/remove
- **Back in TopNavBar**: Navigation controls belong in navigation chrome, not scattered in screen content
- **Named Constants**: SELECTOR_TEXT_SIZE enables consistent updates across all selectors
- **Semantic Naming**: workoutPlanFocusSelector communicates purpose better than selector1

**Problems Solved**:
1. **Spacing Confusion**: Initial attempts mixed 8dp and 10dp. Standardized to pure 8dp rhythm across entire screen.
2. **Text Sizing Inconsistency**: Tried auto-scaling text (adjustsFontSizeToFit). Rejected in favor of consistent 12dp for visual uniformity.
3. **CHEST Text Clipping**: ScrollView paddingTop calculated incorrectly (only topNav.height instead of topSpacing + height). Fixed to 64dp (32+32).
4. **Double Spacing Issues**: Card paddingTop + text marginBottom created 16dp gaps. Removed one to achieve exact 8dp spacing.
5. **Back Button Placement**: Initially in Title Card, moved to TopNavBar for proper navigation UX pattern.
6. **Magic Numbers**: Multiple literal values (1, 12, 50). Created constants and used theme tokens throughout.
7. **Comment Quality**: Historical comments ("Changed from 10dp to 8dp"). Refactored to purpose-driven ("Standard card border radius").

**What Changed**:
- **New Files**:
  - src/features/workout/screens/WorkoutOverviewScreen.tsx (622 lines)
  - src/features/workout/ (new directory structure)

- **Modified Files**:
  - src/components/Navigation/TopNavBar.tsx: Added onBackPress prop, leftButtonsContainer, conditional back button, borderWidth token
  - src/navigation/types.ts: Added WorkoutOverview route with workoutType param
  - src/features/main/screens/HomePage.tsx: Updated to pass onBackPress to TopNavBar (if used)

**User Decisions**:
- 8dp spacing standardized (not 10dp, not 16dp)
- 1dp selector spacing (creates visual grouping)
- 12dp text for selectors (consistency over auto-scaling)
- "Balanced" default for plan focus
- "Standard" default for session type
- All equipment highlighted by default
- Back button in TopNavBar (not in screen content)
- Equipment first-press deselects all and highlights clicked (guidance pattern)

**Key Learnings**:
- Spacing systems work best with single value (8dp) vs mixing values (8dp, 10dp, 16dp)
- Consistent text sizing (12dp) more professional than variable auto-scaling
- Set data structure perfect for multi-select toggle logic
- Named constants (SELECTOR_TEXT_SIZE) enable easy global updates
- Forward-looking comments age better than historical/measurement comments
- Semantic naming (workoutPlanFocusSelector) improves code navigation vs generic (selector1)
- TopNav should own all navigation chrome (back, hamburger, search)
- First-press special behavior can guide users on interaction patterns
- Theme tokens + constants = zero magic numbers

**Next Steps**:
- Connect real workout data to WorkoutOverviewScreen selectors
- Implement navigation flow: HomePage → WorkoutOverview → WorkoutSession
- Build exercise list and detail screens
- Add state persistence for user selections (AsyncStorage)
- Continue to next workout flow screens

---

### v1.1.2 - HomePage Workout Cards & Scrolling (2025-11-16)
**Branch**: Claude-v1.1.2

**Summary**: Implemented complete workout cards system with horizontal scrolling for both primary body part workouts and specialized workout modes. Converted HomePage from absolute positioning to flow layout with proper vertical scrolling. Fixed z-index layering to keep navigation bars fixed while content scrolls underneath. Applied visual enhancements with uppercase green titles for body parts and section headers. All code now compliant with CLAUDE_DEV_STANDARDS (no magic numbers, forward-looking comments).

**What Was Built**:
- **CustomWorkoutCardsScroller Component** (src/components/CustomWorkoutCardsScroller.tsx):
  - Horizontal scrollable container for specialized workout modes
  - 4 workout types: Custom, Work-As-You-Go, SuperSet, Partner Mode
  - Same card dimensions and peek behavior as primary workouts (330dp first/last, 320dp middle, 10dp peek)
  - Snap-to-position scrolling with calculated offsets
  - React.memo optimized

- **Workout Card System Updates** (src/components/WorkoutCard.tsx):
  - Extended to support both BodyPart and CustomWorkout types
  - Body part titles: 32dp uppercase green text (theme.typography.fontSize.xxxl + theme.colors.actionSuccess)
  - Specialized workout titles: 16dp white text with specific names
  - Null handling for missing images (graceful degradation)
  - Centered vertically, left-aligned horizontally
  - Helper functions: getWorkoutTitle(), getWorkoutImage(), isBodyPart()

- **Scrolling Architecture** (src/features/main/screens/HomePage.tsx):
  - Converted from absolute positioning to flow layout
  - Vertical ScrollView contains all page content
  - Fixed z-index layering pattern: ScrollView renders first, topBarsContainer overlays with z-index 10
  - topBarsContainer: absolute positioned, opaque background prevents bleed-through
  - Content scrolls behind fixed bars correctly
  - Section headers: "Primary Workouts" and "Specialized Workouts" at 16dp
  - Proper spacing using theme tokens (10dp between elements)

- **Visual Enhancements**:
  - Body part cards: "CHEST", "ARMS", "SHOULDERS", "BACK & TRIS", "LEGS" in uppercase green
  - Removed (Push)/(Pull) indicators from titles
  - Section headers with consistent 10dp spacing from elements above
  - WelcomeBox uses flow layout with proper margins

- **Workout Images**:
  - Added custom.png, work-as-you-go.png, superset.png, partner-mode.png
  - All 9 workout cards now have images (5 body parts + 4 specialized)
  - Conditional rendering handles missing images gracefully

- **CLAUDE_DEV_STANDARDS Compliance**:
  - Eliminated all magic numbers: 4→theme.spacing.xs, 10→theme.layout.recommendedWorkout.cardSpacing, 16→theme.typography.fontSize.m, 20→theme.spacing.l, 32→theme.typography.fontSize.xxxl
  - Updated all comments to be forward-looking (explain design intent, not history)
  - Consistent section headers across all files
  - All styling via theme tokens

**Why This Approach**:
- **Flow Layout Over Absolute**: Natural document flow enables vertical scrolling without complex position calculations
- **Z-Index Layering**: ScrollView renders first (z-index 0), fixed bars overlay (z-index 10) with opaque background
- **Section Headers**: Clear visual separation between primary and specialized workouts
- **Uppercase Green Titles**: Strong visual hierarchy and brand consistency with green accent color
- **Theme Token Compliance**: Eliminates magic numbers, ensures consistency, simplifies future design changes
- **Peek Pattern**: 10dp visible portion of next card indicates scrollability

**Problems Solved**:
1. **Missing Images Crash**: App crashed when work-as-you-go.png and superset.png didn't exist. Fixed with null handling and conditional rendering.
2. **Scroll Area Boundaries**: Content was scrolling over fixed navigation bars. Fixed by changing divider from absolute to flow layout and adding proper z-index.
3. **Vertical Scroll Not Working**: ScrollView had flex:1 but divider's absolute positioning disrupted layout. Removed absolute positioning from divider.
4. **Content Overlap**: WelcomeBox and cards rendering above navigation. Fixed by wrapping fixed bars in topBarsContainer with higher z-index and opaque background.
5. **Magic Numbers**: Multiple hard-coded values (4dp, 10dp, 16dp, 20dp, 32dp, 64dp). Replaced all with theme tokens.

**What Changed**:
- **New Files**:
  - src/components/CustomWorkoutCardsScroller.tsx (79 lines)
  - src/assets/images/workouts/custom.png
  - src/assets/images/workouts/work-as-you-go.png
  - src/assets/images/workouts/superset.png
  - src/assets/images/workouts/partner-mode.png

- **Modified Files**:
  - src/components/WorkoutCard.tsx: Added CustomWorkout type support, visual styling, null image handling
  - src/components/WorkoutCardsScroller.tsx: Converted to flow layout, updated comments
  - src/components/WelcomeBox.tsx: Converted to flow layout with margins instead of absolute positioning
  - src/features/main/screens/HomePage.tsx: Added ScrollView, topBarsContainer, section headers, z-index layering
  - src/components/index.ts: Exported CustomWorkoutCardsScroller
  - src/hooks/useSwipeGesture.ts: Simplified to only animate WelcomeBox

**Key Learnings**:
- Flow layout with z-index layering cleaner than absolute positioning for complex scrollable pages
- React Native ScrollView needs proper flex constraints - absolute positioned siblings disrupt layout
- Section headers improve UX by creating clear visual hierarchy
- Theme token discipline prevents magic number proliferation
- Conditional rendering (workoutImage &&) handles missing assets gracefully
- Forward-looking comments age better than historical/fix comments

**Next Steps**:
- Implement onPress handlers for workout cards to navigate to detail screens
- Connect to JSON workout data (src/data/exercises.json, src/data/workoutPlans.json)
- Build workout detail screens with exercise lists
- Add workout tracking functionality

---

### v1.1.0 - Environment Setup & Guest Login (2025-11-15)
**Branch**: Claude-v1.1.0

**Summary**: Complete environment configuration with Supabase credentials and guest login system. Fixed critical navigation error preventing guest access to app. Established GitHub project tracking with 8 EPICs and 10 features. App now fully functional on Android device for testing and development.

**What Was Built**:
- **Environment Configuration**:
  - Installed react-native-config package for environment variable management
  - Created .env file with Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY)
  - Configured Android gradle to read .env via dotenv.gradle
  - Added critical line to android/app/build.gradle: `apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"`
  - Added react-native-url-polyfill to index.js for Supabase compatibility
  - Removed unnecessary console.warn from supabaseClient.ts
  - .env properly gitignored to protect credentials

- **Guest Login System** (src/services/supabaseClient.ts):
  - Created `enableGuestMode()`: Sets AsyncStorage flag for guest mode
  - Created `disableGuestMode()`: Removes guest mode flag
  - Created `isGuestMode()`: Checks if app is in guest mode
  - Modified `isAuthenticated()`: Now checks guest mode before Supabase session
  - Implemented AUTH_CHANGE_EVENT using DeviceEventEmitter
  - Guest mode persisted in AsyncStorage with key '@lift321:guest_mode'

- **App.tsx Auth Integration**:
  - Added DeviceEventEmitter listener for AUTH_CHANGE_EVENT
  - Added AppState listener to re-check auth when app comes to foreground
  - Created memoized checkAuth callback
  - App now dynamically switches between AuthNavigator and MainNavigator based on auth state
  - Real-time auth detection allows seamless navigator switching

- **LoginScreen Guest Button**:
  - Updated to call enableGuestMode() instead of direct navigation
  - Added loading state during guest login
  - Disabled all buttons during loading
  - Shows "LOADING..." text during guest mode activation

- **GitHub Project Management**:
  - Created 8 EPICs (never to close):
    - #1: [EPIC] Login System
    - #2: [EPIC] Create New Account
    - #3: [EPIC] Home Page
    - #4: [EPIC] Plan Page
    - #5: [EPIC] Performance Page
    - #6: [EPIC] Profile Page
    - #7: [EPIC] Hamburger Menu
    - #8: [EPIC] Normal Workout/Superset
  - Created 10 Feature/Task Issues:
    - #9: [FEATURE] Add Compared To Weight
    - #10: [FEATURE] Profile Picture - Before After, Weight, Height, Body Fat
    - #11: [FEATURE] Workout Complete Celebratory Text and Grading System
    - #12: [TASK] Update Video Library
    - #13: [FEATURE] Email Partner Completed Workout/Send to Coach/Trainer
    - #14: [FEATURE] Recommended Music For Workout Icon
    - #15: [FEATURE] Brainstorm Ideas For User Navigation Clearing Logs And Resetting Timer
    - #16: [FEATURE] Extrapolated Weight/Set Recommendation
    - #17: [FEATURE] Willpower/Adherence Gauge Tool - Tirzepatide Tracking Gauge, mg Tracking, Estimation
    - #18: [FEATURE] Send Results to Social Media

**Why This Approach**:
- **Environment First**: Can't do anything without Supabase connection
- **Guest Mode Essential**: Need to test app flows without authentication implementation
- **AsyncStorage for Persistence**: Simple, reliable, built-in React Native solution
- **Event-Driven Auth**: DeviceEventEmitter allows components to react to auth changes immediately
- **Navigator Switching**: AuthNavigator for guests/logged out, MainNavigator for authenticated/guest users
- **GitHub Issues**: Track work systematically, mirror Wills321 structure

**Problems Solved**:
1. **Navigation Error**: "LOGIN AS GUEST" was trying to navigate to HomePage which only exists in MainNavigator. Fixed by implementing proper auth state management that switches navigators.
2. **Environment Variables**: react-native-config required specific Android gradle configuration. Added dotenv.gradle line.
3. **Supabase Compatibility**: React Native doesn't have URL API. Added react-native-url-polyfill.
4. **Auth State Detection**: App needed to know when guest mode was enabled. Implemented DeviceEventEmitter for real-time updates.
5. **BOM Character**: Initial .env had byte order mark. Rewrote file without BOM.

**What Changed**:
- **Modified Files**: 8 files (App.tsx, android/app/build.gradle, index.js, package.json, package-lock.json, LoginScreen.tsx, services/index.ts, supabaseClient.ts)
- **New Files**: .env (gitignored)
- **New Dependencies**: react-native-config, react-native-url-polyfill

**Key Learnings**:
- react-native-config requires both npm install AND gradle configuration
- Supabase requires URL polyfill in React Native
- DeviceEventEmitter works great for cross-component auth events
- AsyncStorage perfect for simple persistence like guest mode flags
- Navigator switching in App.tsx based on auth state is clean pattern

**User Decisions**:
- Get app working before building features
- Use guest mode for testing without authentication
- Establish GitHub issues for project tracking
- Mirror Wills321 issue structure
- Keep .env credentials secure with .gitignore

**Files Created/Modified**:
- ✅ Created: .env (gitignored)
- ✅ Modified: App.tsx (auth event listeners, navigator switching)
- ✅ Modified: index.js (URL polyfill import)
- ✅ Modified: android/app/build.gradle (dotenv.gradle configuration)
- ✅ Modified: package.json (new dependencies)
- ✅ Modified: src/features/auth/screens/LoginScreen.tsx (guest login implementation)
- ✅ Modified: src/services/index.ts (export guest mode functions)
- ✅ Modified: src/services/supabaseClient.ts (guest mode system, AUTH_CHANGE_EVENT)

---

### v1.0.15 - Phase 7: Polish & Production Readiness (2025-11-15)
**Branch**: Claude-v1.0.15 (merged to main)

**Summary**: Essential framework components for production readiness. ErrorBoundary for crash protection, reusable state components (LoadingState, ErrorState, EmptyState), environment validation utilities, and app-wide constants. Kept practical - no feature bloat, only essentials that support scaling.

**What Was Built**:
- **ErrorBoundary Component** (src/components/ErrorBoundary/)
  - Catches JavaScript errors in component tree
  - Prevents app crashes with fallback UI
  - User-friendly error message with "Try Again" button
  - Developer error details shown in dev mode only
  - Custom fallback support via props
  - Automatic error logging to console
- **State Components** (src/components/State/)
  - **LoadingState**: Spinner with optional message and fullScreen support
  - **ErrorState**: Error message with retry button
  - **EmptyState**: No-data state with optional title and CTA
  - All React.memo optimized for performance
  - Full design token compliance
  - Consistent UX patterns across app
- **Environment Validation** (src/utils/envUtils.ts)
  - `validateEnv()`: Returns validation result for env vars
  - `requireEnv()`: Throws error if required vars missing (SUPABASE_URL, SUPABASE_ANON_KEY)
  - `getEnv(key, default)`: Safe env var access with defaults
  - `getEnvAsNumber(key, default)`: Type conversion to number
  - `getEnvAsBoolean(key, default)`: Type conversion to boolean
  - `isDevelopment()`, `isProduction()`: Environment checks
  - Validates on app startup for early failure
- **App Constants** (src/constants/app.ts)
  - **App Metadata**: APP_NAME, APP_VERSION, APP_BUILD
  - **API Config**: API_TIMEOUT (30000), API_RETRY_ATTEMPTS (3), API_RETRY_DELAY (1000)
  - **Pagination**: DEFAULT_PAGE_SIZE (20), MAX_PAGE_SIZE (100)
  - **Validation**: MIN_PASSWORD_LENGTH (8), MAX_PASSWORD_LENGTH (128), MIN_NAME_LENGTH, MAX_NAME_LENGTH
  - **Animation**: ANIMATION_DURATION (fast: 150, normal: 300, slow: 500)
  - **Debounce**: DEBOUNCE_DELAY (search: 300, input: 500, scroll: 100)
  - **Storage Keys**: USER_TOKEN, USER_DATA, SETTINGS, ONBOARDING_COMPLETE
  - **Error Messages**: NETWORK_ERROR, TIMEOUT_ERROR, UNKNOWN_ERROR, UNAUTHORIZED, VALIDATION_ERROR
  - **Regex Patterns**: EMAIL, PHONE, URL

**Files Created (11)**:
- ErrorBoundary/ErrorBoundary.tsx (190 lines) - Crash protection component
- ErrorBoundary/README.md (79 lines) - ErrorBoundary documentation
- ErrorBoundary/index.ts (10 lines) - Barrel export
- State/LoadingState.tsx (73 lines) - Loading UI component
- State/ErrorState.tsx (119 lines) - Error UI component
- State/EmptyState.tsx (119 lines) - Empty state component
- State/README.md (160 lines) - State components documentation
- State/index.ts (12 lines) - Barrel export
- utils/envUtils.ts (175 lines) - Environment validation
- constants/app.ts (74 lines) - App-wide constants
- constants/index.ts (10 lines) - Constants barrel

**Files Modified (2)**:
- src/components/index.ts - Added ErrorBoundary and State exports
- src/utils/index.ts - Added envUtils export

**User Decisions**:
- Framework essentials only - no feature bloat
- ErrorBoundary wraps entire app for crash protection
- State components provide consistent UX patterns
- Environment validation catches config issues at startup
- Constants centralize all configuration values
- Keep it practical - only what we'll actually use

**Technical Achievements**:
- Complete error boundary implementation (class component)
- Three reusable state components for all async scenarios
- Type-safe environment variable access
- Centralized constants prevent magic values
- All documentation included for discoverability
- React.memo optimization on all state components

**Testing**: Not yet tested - needs Android device verification

**Key Learnings**:
- Framework > features - establish scalable foundation first
- ErrorBoundary prevents catastrophic crashes
- Consistent state components improve UX across entire app
- Environment validation saves debugging time
- Constants make configuration changes trivial

**Next Steps**: Configure .env with actual Supabase credentials, test refactored code on device, begin feature implementation using established patterns

---

### v1.0.14 - Phase 6: Navigation Improvements (2025-11-15)
**Branch**: Claude-v1.0.14 (merged to main)

**Summary**: Complete type-safe navigation system with typed hooks, imperative navigation service, auth guards, custom transitions, and separated Auth/Main stacks. App.tsx now conditionally renders AuthNavigator or MainNavigator based on authentication state.

**What Was Built**:
- **Navigation Hooks** (src/navigation/hooks.ts - 163 lines)
  - `useTypedNavigation()`: Fully typed navigation with autocomplete
  - `useTypedRoute<T>()`: Typed route params
  - `useNavigationAndRoute<T>()`: Combined hook for both
  - `useSafeNavigate()`: Compile-time param validation
  - `useNavigationActions()`: Common shortcuts (goBack, goToHome, goToLogin, reset, replace, canGoBack)
- **Navigation Service** (src/navigation/navigationService.ts - 141 lines)
  - `navigationRef`: Global navigation reference
  - `navigate()`, `goBack()`, `reset()`, `replace()`: Imperative navigation
  - `getCurrentRoute()`, `isReady()`, `canGoBack()`: Navigation state
  - Enables navigation from services, utils, error handlers
- **Auth Guards** (src/navigation/guards.ts - 170 lines)
  - `useAuthGuard()`: Protects authenticated screens, redirects to login
  - `useGuestGuard()`: Redirects to home if already authenticated
  - `withAuthGuard()`: HOF for protecting actions
  - `requireAuth()`: Standalone auth check for services
- **Custom Transitions** (src/navigation/transitions.ts - 148 lines)
  - **12 Transition Presets**: defaultTransition, modalTransition, fadeTransition, fadeFromBottomTransition, noTransition, iosModalTransition, simplePushTransition, noGestureOptions, fullScreenModalOptions, transparentModalOptions
  - `createCustomTransition()`: Custom duration support
  - `mergeTransitions()`: Combine configs
- **Separated Stacks**
  - **AuthNavigator** (63 lines): LoginScreen, LoginFormScreen, SignUpScreen (modal), SignUpStep2Screen, WelcomeScreen (no gesture)
  - **MainNavigator** (54 lines): HomePage (placeholder comments for future screens)
- **Updated Type System** (src/navigation/types.ts)
  - Separated `AuthStackParamList` and `MainStackParamList`
  - `RootStackParamList` combines both for backward compatibility
  - Screen prop helpers: `AuthStackScreenProps<T>`, `MainStackScreenProps<T>`
- **App.tsx Redesign**
  - Checks auth state on mount with `isAuthenticated()`
  - Conditionally renders `<AuthNavigator />` or `<MainNavigator />`
  - Loading screen with ActivityIndicator during auth check
  - Attached `navigationRef` for global navigation access

**Files Created (8)**:
- navigation/hooks.ts (163 lines)
- navigation/navigationService.ts (141 lines)
- navigation/guards.ts (170 lines)
- navigation/transitions.ts (148 lines)
- navigation/AuthNavigator.tsx (63 lines)
- navigation/MainNavigator.tsx (54 lines)
- navigation/index.ts (66 lines)
- navigation/README.md (385 lines)

**Files Modified (2)**:
- App.tsx (86 lines) - Auth-based navigator switching
- src/navigation/types.ts (71 lines) - Separated stack types

**User Decisions**:
- Separate Auth and Main stacks for clean flow
- Type safety throughout navigation
- Auth guards prevent unauthorized access
- Reusable transition presets for consistency
- navigationService for service layer navigation

**Technical Achievements**:
- Full TypeScript autocomplete for all routes
- Compile-time param validation
- Auth state drives navigator selection
- 12 reusable transition presets
- Comprehensive documentation with examples

**Testing**: Not yet tested - needs device verification

**Key Learnings**:
- Type-safe navigation improves developer experience
- navigationService enables navigation from anywhere
- Auth guards centralize security logic
- Separated stacks keep auth flow isolated
- Transition presets ensure consistent UX

**Next Steps**: Test navigation flows on device, implement auth logic, build out main app screens

---

### v1.0.13 - Phase 5: Data Layer & Architecture (2025-11-15)
**Branch**: Claude-v1.0.13 (merged to main)

**Summary**: Complete service layer infrastructure with Supabase integration. Unified `ApiResult<T>` pattern for all API responses, `BaseService` class for generic CRUD operations, `authService` example implementation, comprehensive error handling utilities, and type guards.

**What Was Built**:
- **API Types** (src/types/api.types.ts - 127 lines)
  - `ApiResponse<T>`: Successful response `{data: T, error: null, status: 'success'}`
  - `ApiError`: Error response `{data: null, error: {message, code?, details?}, status: 'error'}`
  - `ApiResult<T>`: Combined type (ApiResponse | ApiError)
  - `ApiErrorCode` enum: UNAUTHORIZED, FORBIDDEN, INVALID_CREDENTIALS, VALIDATION_ERROR, NOT_FOUND, etc.
  - Type guards: `isApiSuccess<T>()`, `isApiError()`
- **Supabase Client** (src/services/supabaseClient.ts - 81 lines)
  - Client initialization with auth config (autoRefreshToken, persistSession)
  - `getCurrentUser()`: Get authenticated user
  - `getCurrentSession()`: Get session
  - `signOut()`: Sign out user
  - `isAuthenticated()`: Boolean auth check
- **API Utilities** (src/services/apiUtils.ts - 198 lines)
  - `createSuccessResponse<T>(data)`: Format success
  - `createErrorResponse(message, code, details)`: Format error
  - `handleSupabaseError(error)`: Map Postgrest errors to ApiError
  - `getErrorMessage(error)`: Extract user-friendly message
  - `isErrorCode(error, code)`: Check specific error code
  - `handleAsync<T>(asyncFn)`: Wrap async operations in try/catch
  - `handleSupabaseQuery<T>(queryFn)`: Wrap Supabase queries with error handling
  - `retry<T>(fn, options)`: Exponential backoff retry logic
  - `validateRequiredFields(data, fields)`: Validate required fields exist
- **Base Service** (src/services/BaseService.ts - 267 lines)
  - Generic CRUD class for any Supabase table
  - `getAll(options)`: Fetch all records with ordering/pagination
  - `getById(id)`: Fetch single record
  - `getBy(filters)`: Fetch filtered records
  - `create(data)`: Insert new record
  - `update(id, data)`: Update existing record
  - `delete(id)`: Delete record
  - `count(filter)`: Count records
  - `exists(id)`: Check if record exists
  - Extend for specific tables
- **Auth Service** (src/services/authService.ts - 306 lines)
  - Example service implementation
  - `signUp(credentials)`: Create new user account
  - `signIn(credentials)`: Email/password sign in
  - `signOut()`: Sign out current user
  - `requestPasswordReset(request)`: Send reset email
  - `updatePassword(request)`: Update password
  - `getCurrentUser()`: Get current user
  - Demonstrates service patterns with validation, error handling, type safety
  - Singleton export: `export const authService = new AuthService()`

**Files Created (8)**:
- types/api.types.ts (127 lines)
- types/index.ts (22 lines)
- services/supabaseClient.ts (81 lines)
- services/apiUtils.ts (198 lines)
- services/BaseService.ts (267 lines)
- services/authService.ts (306 lines)
- services/index.ts (44 lines)
- services/README.md (262 lines)

**User Decisions**:
- Generic service layer - kept flexible for future Supabase schema
- ApiResult<T> pattern for all API operations
- Type guards for response checking
- BaseService as foundation for all tables
- authService as pattern example
- Complete documentation for discoverability

**Technical Achievements**:
- Unified response format across entire app
- Type-safe CRUD operations
- Comprehensive error handling
- Retry logic with exponential backoff
- Field validation utilities
- Complete service layer documentation

**Testing**: Not yet tested - needs Supabase credentials and DB schema

**Key Learnings**:
- ApiResult<T> pattern provides consistency
- BaseService eliminates boilerplate
- Type guards enable type-safe error handling
- Service layer keeps components clean
- Generic patterns scale well

**Next Steps**: Configure .env with Supabase credentials, create DB schema, implement auth logic in screens

---

### v1.0.12 - Phase 4: Auth Screens Refactoring (2025-11-15)
**Branch**: Claude-v1.0.12 (merged to main)

**Summary**: Small focused phase. Created `ActionButton` component for simple CTA buttons. Refactored SignUpScreen, SignUpStep2Screen, and WelcomeScreen to use ActionButton instead of inline buttons.

**What Was Built**:
- **ActionButton Component** (src/components/Button/ActionButton.tsx - 77 lines)
  - Simple CTA button (no shadow layers)
  - Props: text, onPress, disabled, style
  - Green background with pressed state (0.8 opacity)
  - Bebas Neue font with letter spacing
  - Used for "NEXT", "LET'S GO" buttons

**Files Created (1)**:
- components/Button/ActionButton.tsx (77 lines)

**Files Modified (4)**:
- components/Button/index.ts - Added ActionButton export
- features/auth/screens/SignUpScreen.tsx - 242 → 208 lines (34 line reduction)
- features/auth/screens/SignUpStep2Screen.tsx - 214 → 178 lines (36 line reduction)
- features/auth/screens/WelcomeScreen.tsx - 168 → 134 lines (34 line reduction)

**User Decisions**:
- Simple focused phase - just one component
- Eliminate duplicate button code across auth screens
- Keep ActionButton simple (no shadow layers)

**Technical Achievements**:
- 104 lines eliminated across 3 screens
- Consistent button styling
- Reduced code duplication

**Testing**: Not yet tested

**Key Learnings**:
- Small focused changes are easier to verify
- Even simple components reduce duplication
- Consistent patterns improve maintainability

**Next Steps**: Phase 5 - Data Layer & Architecture

---

### v1.0.11 - Phase 3: Utils & Hook Infrastructure (2025-11-15)
**Branch**: Claude-v1.0.11 (merged to main)

**Summary**: Comprehensive utility and hook infrastructure. Created 60+ utility functions across dateUtils, validationUtils, formatUtils. Built useFormInput hook with validation, useAnimation hook (fade/slide/scale), and refactored useWeekCalendar to use dateUtils.

**What Was Built**:
- **dateUtils.ts** (src/utils/dateUtils.ts - 236 lines)
  - **20+ date functions**: formatDateShort, formatDateLong, formatDateFull, formatTime, formatDateTime, formatRelativeDate
  - **Week calculations**: getWeekStart, getWeekEnd, getWeekDates, getDayLetter
  - **Date comparisons**: isSameDay, isSameWeek, isSameMonth, isToday, isYesterday, isTomorrow
  - **Date math**: addDays, subtractDays, getDaysBetween, getWeeksBetween
  - **Utilities**: parseDate, isValidDate, getAge, getDaysInMonth
- **validationUtils.ts** (src/utils/validationUtils.ts - 294 lines)
  - **15+ validators**: validateEmail, validatePassword, validatePasswordStrength, validateName, validatePhone, validateURL
  - **Password strength**: getPasswordStrength (weak/medium/strong), MIN_PASSWORD_LENGTH (8)
  - **Form validation**: createValidator, combineValidators, isValidationError
  - **Type**: ValidationResult = string | null (null = valid)
  - **Regex patterns**: EMAIL_REGEX, PHONE_REGEX, URL_REGEX
- **formatUtils.ts** (src/utils/formatUtils.ts - 267 lines)
  - **25+ formatters**: formatCurrency, formatPercentage, formatPhoneNumber, formatNumber, formatNumberWithCommas
  - **Time formatting**: formatDuration, formatTimeAgo, formatCountdown
  - **Text utilities**: truncate, capitalize, titleCase, pluralize, slugify
  - **Number utilities**: clamp, roundToDecimal, formatBytes
- **useFormInput.ts** (src/hooks/useFormInput.ts - 127 lines)
  - Form input state management with validation
  - Returns: value, error, touched, setValue, setError, setTouched, handleChange, handleBlur, validate, reset, clear
  - Config: initialValue, validator, validateOnChange, validateOnBlur
  - Example: `const email = useFormInput({initialValue: '', validator: validateEmail})`
- **useAnimation.ts** (src/hooks/useAnimation.ts - 308 lines)
  - **useFadeAnimation**: fadeIn, fadeOut, fadeToggle
  - **useSlideAnimation**: 8-direction slides (in/out from all sides)
  - **useScaleAnimation**: scaleIn, scaleOut, pulse, reset
  - Config: duration, easing, useNativeDriver, delay
- **useWeekCalendar.ts Refactored** (44 lines - down from 100 lines, 53% reduction)
  - Now uses dateUtils functions instead of manual date logic
  - getWeekDates, formatDateShort, getDayLetter imported from dateUtils
  - Much cleaner and more maintainable

**Files Created (8)**:
- utils/dateUtils.ts (236 lines)
- utils/validationUtils.ts (294 lines)
- utils/formatUtils.ts (267 lines)
- hooks/useFormInput.ts (127 lines)
- hooks/useAnimation.ts (308 lines)
- hooks/index.ts (12 lines) - Barrel export
- utils/README.md (118 lines) - Utils documentation
- hooks/README.md (146 lines) - Hooks documentation

**Files Modified (2)**:
- utils/index.ts - Added new utility exports
- hooks/useWeekCalendar.ts - Refactored to use dateUtils (100 → 44 lines, 53% reduction)

**User Decisions**:
- Comprehensive utility library covers most common needs
- Password strength analysis for better UX
- Form hook with built-in validation
- Animation hooks for common patterns
- Well-documented for discoverability

**Technical Achievements**:
- 60+ utility functions eliminating common boilerplate
- Type-safe validation with clear error messages
- Reusable animation hooks for consistent motion
- Form hook simplifies input state management
- useWeekCalendar refactored to 53% smaller

**Testing**: Not yet tested

**Key Learnings**:
- Comprehensive utils prevent reinventing the wheel
- Password strength feedback improves security UX
- Animation hooks encapsulate complex Animated API
- Form hooks eliminate repetitive state management
- Utilities enable refactoring existing code

**Next Steps**: Phase 4 - Auth Screens Refactoring

---

### v1.0.10 - Phase 2: HomePage Decomposition (2025-11-15)
**Branch**: Claude-v1.0.10 (merged to main)

**Summary**: Extracted 4 navigation components (TopNavBar, WeekCalendar, PlanProgressBar, BottomTabBar) and 2 hooks (useWeekCalendar, useSwipeGesture) from HomePage. Reduced HomePage from 515 lines to 137 lines (73% reduction). All components React.memo optimized.

**What Was Built**:
- **TopNavBar** (src/components/Navigation/TopNavBar.tsx - 77 lines)
  - Search and menu buttons
  - Props: onSearchPress, onMenuPress
  - React.memo optimized
- **WeekCalendar** (src/components/Navigation/WeekCalendar.tsx - 102 lines)
  - 7-day week selector with today highlighting
  - Uses useWeekCalendar hook for date logic
  - Active state management
  - React.memo optimized
- **PlanProgressBar** (src/components/Navigation/PlanProgressBar.tsx - 92 lines)
  - Current plan display with progress
  - Day/week progress indicators
  - React.memo optimized
- **BottomTabBar** (src/components/Navigation/BottomTabBar.tsx - 112 lines)
  - 4 tabs: Home, Plans, Performance, Profile
  - Active state with green highlight
  - Icon size and spacing tokenized
  - React.memo optimized
- **useWeekCalendar** (src/hooks/useWeekCalendar.ts - 100 lines, later refactored in Phase 3)
  - Week dates calculation
  - Day letter formatting
  - Today detection
  - useMemo optimized
- **useSwipeGesture** (src/hooks/useSwipeGesture.ts - 100 lines)
  - Swipe-to-dismiss gesture handling
  - PanResponder setup with thresholds
  - Animation integration
  - Reusable across components

**Files Created (8)**:
- components/Navigation/TopNavBar.tsx (77 lines)
- components/Navigation/WeekCalendar.tsx (102 lines)
- components/Navigation/PlanProgressBar.tsx (92 lines)
- components/Navigation/BottomTabBar.tsx (112 lines)
- components/Navigation/index.ts (12 lines)
- hooks/useWeekCalendar.ts (100 lines)
- hooks/useSwipeGesture.ts (100 lines)
- hooks/index.ts (8 lines)

**Files Modified (2)**:
- features/main/screens/HomePage.tsx - 515 → 137 lines (73% reduction, 378 lines eliminated)
- components/index.ts - Added Navigation barrel export

**User Decisions**:
- Extract all navigation components from HomePage
- Create reusable hooks for date and gesture logic
- React.memo optimize all components
- Keep HomePage clean and focused

**Technical Achievements**:
- 73% reduction in HomePage size
- 6 new reusable components/hooks
- React.memo optimization on all components
- Clean separation of concerns
- Eliminated 378 lines from HomePage

**Testing**: Not yet tested

**Key Learnings**:
- Monolithic files (500+ lines) are hard to maintain
- Component extraction improves reusability
- Hooks encapsulate complex logic nicely
- React.memo prevents unnecessary re-renders
- Smaller files are easier to understand

**Next Steps**: Phase 3 - Utils & Hook Infrastructure

---

### v1.0.9 - Phase 1: Component Library (2025-11-15)
**Branch**: Claude-v1.0.9 (merged to main)

**Summary**: Created foundation of reusable component library. ShadowButton (3 variants), FormInput (with focus/error states), PasswordInput (extends FormInput), SocialButton (Google/Facebook config-driven). Eliminated 180+ lines of duplicate shadow button code.

**What Was Built**:
- **ShadowButton** (src/components/Button/ShadowButton.tsx - 134 lines)
  - 3 variants: primary (green), secondary (white), tertiary (transparent)
  - Multi-layer shadow system (3 layers)
  - Pressed and disabled states
  - Bebas Neue font with letter spacing
  - Eliminated duplicate shadow button code from 6 instances across auth screens
  - Saved 180+ lines of duplicate code
- **FormInput** (src/components/Input/FormInput.tsx - 126 lines)
  - Text input with focus/error states
  - Focus border changes color
  - Error styling and message
  - Right element support (for icons)
  - Props: value, onChangeText, placeholder, keyboardType, autoCapitalize, error, rightElement
- **PasswordInput** (src/components/Input/PasswordInput.tsx - 52 lines)
  - Extends FormInput
  - Show/hide password toggle with eye icons
  - Auto-sets secureTextEntry, autoCapitalize: none, autoCorrect: false
  - Uses EyeOpen/EyeClosed SVG icons
- **SocialButton** (src/components/Button/SocialButton.tsx - 102 lines)
  - Config-driven OAuth buttons
  - Google: White background, blue logo, black text
  - Facebook: Blue background, white text/logo
  - PROVIDER_CONFIG object with all styling
  - Logo, text, colors, sizes configured per provider
  - Props: provider ('google' | 'facebook'), onPress

**Files Created (7)**:
- components/Button/ShadowButton.tsx (134 lines)
- components/Button/index.ts (9 lines)
- components/Input/FormInput.tsx (126 lines)
- components/Input/PasswordInput.tsx (52 lines)
- components/Input/index.ts (8 lines)
- components/Button/SocialButton.tsx (102 lines)
- components/index.ts (18 lines) - Main barrel export

**Files Modified (2)**:
- features/auth/screens/LoginScreen.tsx - Uses ShadowButton (174 lines eliminated)
- features/auth/screens/LoginFormScreen.tsx - Uses FormInput, PasswordInput, SocialButton (400 → 252 lines, 37% reduction)

**User Decisions**:
- Build component library foundation
- Eliminate duplicate shadow button code (highest priority)
- Create reusable form inputs
- Config-driven social buttons for scalability
- Establish barrel export pattern

**Technical Achievements**:
- 180+ lines of duplicate code eliminated
- LoginFormScreen reduced by 37% (148 lines)
- Consistent component API across library
- Barrel exports for clean imports
- All components follow CLAUDE_DEV_STANDARDS

**Testing**: Not yet tested

**Key Learnings**:
- Component libraries eliminate massive code duplication
- Shadow button pattern was repeated 6+ times
- Config-driven components scale well
- Barrel exports simplify imports
- Small focused components are easier to test

**Next Steps**: Phase 2 - HomePage Decomposition

---

### v1.0.8 - Phase 0: Tokenization Sweep (2025-11-15)
**Branch**: Claude-v1.0.8 (merged to main)

**Summary**: Complete first-pass tokenization sweep across entire codebase. Eliminated 51 magic numbers from 5 auth screens. Added 13 new design tokens across spacing, typography, layout, and buttons modules. 100% CLAUDE_DEV_STANDARDS compliance achieved.

**What Was Built**:
- **New Spacing Tokens** (src/theme/spacing.ts):
  - `xxs: 2` - Extra tight spacing
  - `inputMarginSmall: 5` - Small input margins
- **New Typography Tokens** (src/theme/typography.ts):
  - `letterSpacing.button: 0.5` - Button letter spacing
  - `letterSpacing.extraWide: 3` - Extra wide spacing
- **New Layout Tokens** (src/theme/layout.ts):
  - authNavigation section: `backButtonLeft: 24`, `backButtonTop: 64`, `backButtonSize: 32`
  - socialLogin section: `googleLogoFontSize: 20`, `facebookLogoFontSize: 20`, `buttonHeight: 50`, `buttonBorderRadius: 8`, `buttonMarginVertical: 8`, `dividerMarginVertical: 16`
- **New Button Tokens** (src/theme/buttons.ts):
  - `opacity.pressed: 0.8` - Pressed state opacity
  - `opacity.disabled: 0.5` - Disabled state opacity

**Files Modified (9)**:
- src/theme/spacing.ts - Added 2 tokens
- src/theme/typography.ts - Added 2 tokens
- src/theme/layout.ts - Added 9 tokens
- src/theme/buttons.ts - Added 2 tokens
- src/features/auth/screens/LoginScreen.tsx - Tokenized (13 magic numbers eliminated)
- src/features/auth/screens/LoginFormScreen.tsx - Tokenized (15 magic numbers eliminated)
- src/features/auth/screens/SignUpScreen.tsx - Tokenized (8 magic numbers eliminated)
- src/features/auth/screens/SignUpStep2Screen.tsx - Tokenized (9 magic numbers eliminated)
- src/features/auth/screens/WelcomeScreen.tsx - Tokenized (6 magic numbers eliminated)

**Magic Numbers Eliminated**:
- **LoginScreen.tsx**: 13 (back button size, positions, icon sizes)
- **LoginFormScreen.tsx**: 15 (input heights, spacing, logo sizes, border radius)
- **SignUpScreen.tsx**: 8 (back button, spacing)
- **SignUpStep2Screen.tsx**: 9 (icon size, spacing, positions)
- **WelcomeScreen.tsx**: 6 (button positions, spacing)
- **Total**: 51 magic numbers eliminated

**User Decisions**:
- Complete tokenization before structural refactoring
- Anything not tokenized is an obvious first pass
- Establish token architecture for all future work
- 100% CLAUDE_DEV_STANDARDS compliance required

**Technical Achievements**:
- Zero magic numbers in all auth screens
- 13 new design tokens added
- Complete CLAUDE_DEV_STANDARDS compliance
- All comments forward-looking
- All styling via theme.* tokens

**Testing**: Not yet tested

**Key Learnings**:
- Tokenization first prevents future refactoring issues
- Magic numbers lurk in many places (spacing, sizing, opacity)
- Token system makes bulk changes trivial
- Forward-looking comments keep code clean

**Next Steps**: Phase 1 - Component Library

---

### v1.0.7 - Branch Created (2025-11-14)
**Branch**: Claude-v1.0.7 (ready for development)

**Summary**: New branch created from main after v1.0.6 HomePage implementation. Ready for new development work. User requested comprehensive refactoring to improve file structure, reduce monolithic files, enhance performance, and establish scalable patterns using modern React Native best practices.

**Next Steps**: Assess codebase for improvements, plan comprehensive refactoring phases, begin Phase 0 with complete tokenization sweep

---

### v1.0.6 - HomePage Implementation & Physical Device Testing (2025-11-14)
**Branch**: Claude-v1.0.6 (merged to main)

**Summary**: Complete HomePage implementation with top navigation bar and bottom tab bar. Renamed MainActivity to HomePage for semantic clarity. Added SearchIcon component. Extensive physical device testing via USB with iterative UI refinements. Applied CLAUDE_DEV_STANDARDS to eliminate all magic numbers - created theme.layout.topNav tokens and updated bottomNav tokens. Physical device testing workflow established. Branch merged to main successfully.

---

### Historical Versions (v1.0.0 - v1.0.5)

**v1.0.5 - Comprehensive Design Token System Refactoring (2025-11-11)**: Complete refactoring of design token system. Established 64dp safe zone standard, expanded color/typography/spacing tokens, refactored all auth screens (LoginScreen, LoginFormScreen, SignUpScreen) with zero hardcoded values. Added Standard #10: Forward-Looking Comments. Branch merged to main successfully.

**v1.0.4a - MainActivity Base UI Complete (2025-11-10)**: Complete MainActivity base UI with hamburger sidebar, day selector tabs, workout preview card, bottom navigation, and Start Workout button. All components fully tokenized with zero magic numbers. Slide-out sidebar drawer replaces dropdown menu. Branch merged to main successfully.

**v1.0.0-v1.0.3 Summary**: Project evolved from foundation (React Native 0.82.1 with TypeScript, Supabase, feature-based architecture, design token system) through LoginScreen implementation with custom fonts (Bebas Neue/Roboto), multi-layer shadows, and complete tokenization, to full navigation setup with React Navigation, LoginFormScreen, MainActivity, SVG icon system, and theme.layout module. Gradle upgraded to 9.2.0 for Android Studio compatibility.

---

## Technical Notes

### Absolute Imports Configuration
- `tsconfig.json`: baseUrl + paths for @/ aliases
- `babel.config.js`: module-resolver plugin

### Supabase Client
- AsyncStorage for session persistence
- Auto refresh tokens enabled
- Type-safe with Database generic

### React Navigation (UPDATED v1.0.14)
- Type-safe routes via RootStackParamList, AuthStackParamList, MainStackParamList
- Global type augmentation
- Screen props helper types
- useTypedNavigation, useTypedRoute hooks
- navigationService for imperative navigation

### Custom Fonts (v1.0.2+)
- Linked via `react-native.config.js` + `npx react-native-asset`
- Bebas Neue: Brand headings, screen titles, button text
- Roboto: Body text, input fields, descriptions

### Multi-Layer Shadow Pattern (v1.0.2+)
- Pure black (#000000) base
- Three positioned Views with decreasing opacity (0.4 → 0.25 → 0.15)
- Android compatible (no shadowColor prop)
- Drops straight down (left: 0, right: 0, varying top offset)

### Design Token Modules (UPDATED v1.0.15)
- `theme.colors` - Semantic color palette
- `theme.spacing` - 16px base rhythm
- `theme.typography` - Font sizes, weights, letter spacing
- `theme.textStyles` - Pre-built text combinations
- `theme.textShadows` - Text shadow presets
- `theme.viewShadows` - View shadow presets
- `theme.elevation` - Android elevation values
- `theme.buttons` - Button dimensions, shadow layers, opacity
- `theme.layout` - Layout constants (header, logo, form, bottom, topNav, bottomNav, authNavigation, socialLogin)

### Component Library (NEW v1.0.9)
- ShadowButton, FormInput, PasswordInput, SocialButton, ActionButton
- LoadingState, ErrorState, EmptyState
- ErrorBoundary
- All React.memo optimized

### Service Layer (NEW v1.0.13)
- ApiResult<T> pattern for all API operations
- BaseService class for generic CRUD
- authService example implementation
- Type guards: isApiSuccess, isApiError
- Unified error handling

### Navigation System (NEW v1.0.14)
- useTypedNavigation, useTypedRoute, useNavigationActions
- navigationService for imperative navigation
- Auth guards: useAuthGuard, useGuestGuard
- 12 custom transition presets
- Separated AuthNavigator and MainNavigator

### Utilities (NEW v1.0.11)
- dateUtils: 20+ date functions
- validationUtils: 15+ validators with password strength
- formatUtils: 25+ formatters
- envUtils: Environment validation and access

### Hooks (NEW v1.0.11)
- useFormInput: Form state with validation
- useAnimation: fade/slide/scale animations
- useWeekCalendar: Week date calculations
- useSwipeGesture: Swipe-to-dismiss gestures

---

## Critical Context

**What This Project IS**:
- Brand new React Native + TypeScript app (Lift 3-2-1)
- Built from scratch with modern best practices
- Fresh implementation informed by previous project learnings
- **Comprehensive refactoring complete (v1.0.8-v1.0.15)**

**What This Project IS NOT**:
- NOT a code migration or port
- NOT using existing backend infrastructure
- Establishing its own design system through development

---

**Current Version**: 1.0.15
**Last Updated**: 2025-11-15
