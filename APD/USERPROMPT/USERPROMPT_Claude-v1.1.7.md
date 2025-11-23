# User Prompt - Claude v1.1.7

**Date**: 2025-11-22
**Branch**: Claude-v1.1.7
**Feature**: PlansPage Implementation

---

## Original User Request

I'd like to make a plans page. Tapping the "Plans" button in the bottom tab bar will bring up the new page. The new page should be nearly identical to the homepage in design and layout. The navigation bar, calendar bar, and progress bar should all be at the top with a 1dp green border below the progress bar, also marking the scrollable area, just as it is now on the homepage. The bottom tab bar should be and exact copy from the homepage, with the homepage bars still serving as the source of truth for changes.

We're going to copy the "Primary Workouts" text, size, color, spacing, etc and instead put the text "Lift 321 Plans". Beneath that we're going to create a 128dp card, and in the upper left hand corner the text "Lift 3-2-1" in all caps. We're going to create a second card, scrollable on the right, virtually identical to the Primary Workouts cards, Chest, Arms, etc. The second 128dp card will say "Lift 3-2-GLP-1" in all caps.

We're going to make more plan cards that are scrollable to the right and left just like the homepage with "Lift 3-2-1" as the main card to the left. We're going to create the same spacing and peeks just like in the homepage. Let's a third card "Beginner 3-2-1", and a fourth card "Advanced 3-2-1" and a fifth card "Expert 3-2-1", and a sixth card "Strength 3-2-1" and a seventh card "Growth 3-2-1" and an eigth final card all the way right, "Zero-to-SuperHero".

This should have all the same scrollable properties, card sizes and changes to allow the peeks to properly be on the left and right just as they are on the homepage.

We're also going to create a second text 16dp below the "Lift 3-2-1" card using the same text as the "Sepcialized Workouts" text, sizing, spacing, color, etc., but instead will say "Popular Plans". Below that we're going to create another 128dp plan card called "Athlete" a second card called "Weight Loss" and a third card called "Lean". These cards are to be identical to the above cards in terms of scrollable area, peeks, and left and right card spacing.

These plan cards will be both horizontially and vertically scrollable, exactly the same as the homepage using the same methods and fixes for scroll behavior.

Please record all of this prompt text I just typed in the USERPROMPT folder in a USERPROMPT_Claude-v1.1.7.md file.

---

## User Clarifications (from Q&A)

**Card Structure**: Simpler design (just plan name) - No background images or BEGIN buttons

**Font Style**: Use Roboto font (different from Zuume-ExtraBold used on WorkoutCard)

**Card Colors**: All same color/style - Consistent background across all plan cards

**Card Interaction**: Not functional yet - Cards are visual only for now, functionality will be added later

---

## Implementation Summary

### PlansPage Layout
- Mirror HomePage structure exactly
- Fixed top bars: TopNavBar, WeekCalendar, PlanProgressBar (absolute positioned, zIndex: 10)
- 1dp green border below progress bar
- Scrollable content area below (paddingTop: 120dp)
- Fixed BottomTabBar at bottom (exact copy of HomePage)

### First Section - "Lift 321 Plans"
**Section Header**:
- Text: "Lift 321 Plans"
- Styling: Same as "Primary Workouts" (16dp Roboto Bold, white, 8dp margins)

**Horizontal Scroller (8 plan cards)**:
1. LIFT 3-2-1 (main/leftmost card)
2. LIFT 3-2-GLP-1
3. BEGINNER 3-2-1
4. ADVANCED 3-2-1
5. EXPERT 3-2-1
6. STRENGTH 3-2-1
7. GROWTH 3-2-1
8. ZERO-TO-SUPERHERO (rightmost card)

### Second Section - "Popular Plans"
**Section Header**:
- Text: "Popular Plans"
- Spacing: 16dp below first scroller
- Styling: Same as "Specialized Workouts" (16dp Roboto Bold, white, 8dp margins)

**Horizontal Scroller (3 plan cards)**:
1. ATHLETE
2. WEIGHT LOSS
3. LEAN

### Card Specifications
- **Dimensions**: 330dp width × 128dp height
- **Design**: Simple with plan name in upper left corner (16dp padding)
- **Font**: Roboto Bold, white, UPPERCASE
- **Background**: Consistent color (backgroundSecondary or backgroundCard)
- **Spacing**: 8dp left margin, 8dp between cards, 8dp peek on right
- **Behavior**: Horizontal scrolling with snap-to-card, non-functional (visual only)

### Scrolling Behavior
- **Horizontal**: Plan cards scroll left/right with 8dp peeks
- **Vertical**: Full page scrolls up/down
- **Pattern**: Exact same as HomePage (directionalLockEnabled, snap offsets, smooth scrolling)

---

## Files to Create
1. `APD/USERPROMPT/USERPROMPT_Claude-v1.1.7.md` - This file
2. `src/components/PlanCard.tsx` - Simple plan card component (128dp height)
3. `src/components/PlanCardsScroller.tsx` - Horizontal scroller for plan cards
4. `src/features/main/screens/PlansPage.tsx` - Main plans page screen

## Files to Modify
1. Navigation files - Add PlansPage route
2. Navigation types - Add PlansPage to types
3. BottomTabBar - Verify Plans tab navigation (may already be configured)
