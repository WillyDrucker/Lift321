# Shared Workouts System

## Vision

Sharing workouts is the core value proposition of Lift 3-2-1. Users hunger to share workouts - some can't wait to show friends, others can't wait to ask. By enabling workout sharing, we transform workouts into a tradeable commodity with massive network effects.

**Every feature should answer: "How does this contribute to sharing workouts?"**

---

## Core Challenges

### The Discovery Problem

When a user has 30+ friends sharing workouts (football team, gym buddies, family), finding the right workout becomes difficult:

- Dave shared a Chest workout
- Stav shared 5 workouts (Arms, Chest, Back, Legs, Shoulders)
- Football team shared 20+ workouts
- Debbie just shared a Legs workout

**How does the user find Dave's Chest among 100+ shared workouts?**

### The Urgency Problem

Debbie shares a Legs workout and wants immediate action. But:

- Today is Monday (Chest day on user's plan)
- Dave shares his workout 5 minutes later
- Debbie's share gets buried

**How do we handle time-sensitive shares without losing them?**

### The Plan Variation Problem

Different users have different plan structures:

| User | Monday | Saturday |
|------|--------|----------|
| User A | Chest | Legs |
| User B | Legs | Rest |
| User C | Push | Pull |

If User A shares a "Legs" workout with User B, User B has Legs on Monday, not Saturday. The organization can't assume universal plan structures.

### The Clueless User Problem

Many users:

- Don't know their plan structure well
- Don't remember which day is which body part
- Don't know what workout they want
- Just want to browse and find something

---

## Solution Architecture

### Two Distinct Systems

```
┌─────────────────────────────────────────────┐
│                                             │
│  SOCIAL              SHARED WORKOUTS        │
│  (Activity Feed)     (Library)              │
│                                             │
│  WHO shared WHAT     WHERE things live      │
│  Chronological       Body-part organized    │
│  Never loses items   Universal taxonomy     │
│  People-centric      Workout-centric        │
│                                             │
└─────────────────────────────────────────────┘
```

**Social Feed** handles urgency and recency - nothing gets buried.

**Shared Workouts Library** handles organization and discovery - universal structure.

---

## Social Feed

### Purpose

Chronological activity feed showing all friend activity. Like Instagram's activity tab.

### Content

- Workout shares (primary)
- Workout completions
- Likes and reactions
- Comments and messages
- Achievement unlocks

### Example

```
┌─────────────────────────────────────────────┐
│ SOCIAL                                      │
├─────────────────────────────────────────────┤
│ Debbie shared "Deb's Leg Blast"             │
│ 2 minutes ago                    [View]     │
├─────────────────────────────────────────────┤
│ Dave shared "Chest Destroyer"               │
│ 5 minutes ago                    [View]     │
├─────────────────────────────────────────────┤
│ Stav completed "Arms Day"                   │
│ 1 hour ago                                  │
├─────────────────────────────────────────────┤
│ Terry liked your workout                    │
│ 3 hours ago                                 │
└─────────────────────────────────────────────┘
```

### Key Properties

- **Chronological**: Most recent at top
- **Permanent**: Nothing gets overwritten or lost
- **Scrollable**: Can go back through history
- **Actionable**: Each item has relevant actions

---

## Shared Workouts Library

### Organization: Body-Part Based (Universal)

Rejected day-based organization because it requires plan knowledge. Body-part tabs are universal - everyone knows what "Chest" and "Legs" mean.

```
┌─────────────────────────────────────────────┐
│ SHARED WORKOUTS                             │
├─────────────────────────────────────────────┤
│ CHEST ★ | ARMS | BACK | SHOULDERS | LEGS    │
│ ━━━━━━━                                     │
│ (★ = today's focus based on your plan)      │
├─────────────────────────────────────────────┤
│ TOP PICK                                    │
│ [Dave's Chest - 45min, battle-tested]       │
├─────────────────────────────────────────────┤
│ ALL CHEST (23)                              │
│ [Card] [Card] [Card] [Card] →               │
│                ↓ scroll for more            │
└─────────────────────────────────────────────┘
```

### Why Body-Part Based

| Advantage | Explanation |
|-----------|-------------|
| Universal | Everyone knows body parts |
| No plan knowledge | Don't need to know "Saturday = Legs" |
| Works for all plans | Traditional, PPL, Upper/Lower all map |
| Simple mental model | "Legs workouts in Legs tab" |

### Today's Focus Indicator

The star (★) indicates today's body part based on the user's plan. This provides context without driving structure:

- If today = Chest day, CHEST tab has ★
- User can still browse any tab
- Helps orient without requiring knowledge

### Alternative View Options

Power users can toggle organization:

```
VIEW BY: [Body Part ●] [Person] [Recent]
```

- **Body Part** (default): Universal taxonomy
- **Person**: Group by who shared (Deb | Dave | Stav)
- **Recent**: Chronological discovery mode

---

## Navigation Bridge: Social → Library

When viewing a shared workout from Social, user can:

```
┌─────────────────────────────────────────────┐
│ DEB'S LEG BLAST                             │
│                                             │
│ [Exercise tree preview]                     │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ [START NOW]                             │ │
│ │ Go directly to workout                  │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ [TAKE ME TO WORKOUT]                    │ │
│ │ View in library: Legs tab               │ │
│ └─────────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

**START NOW**: Bypass library, go straight to workout execution

**TAKE ME TO WORKOUT**: Navigate to library location
- Opens Shared Workouts
- Auto-selects LEGS tab
- Scrolls to Deb's card (highlighted)
- User learns the organizational structure

---

## Ranking Algorithm

Within each body-part tab, workouts are ranked by composite score:

```
Score = (Creator Usage × 3) +
        (Community Saves × 2) +
        (Your History × 5) +
        (Social Proximity × 2) +
        (Recency Boost)
```

### Ranking Factors

| Factor | Weight | Rationale |
|--------|--------|-----------|
| Your History | ×5 | You've done it before = trusted |
| Creator Usage | ×3 | They did it 20x = proven workout |
| Social Proximity | ×2 | Close friend > acquaintance |
| Community Saves | ×2 | Social proof |
| Recency | boost | Fresh content surfaces |

### Visual Indicators

- **★ Today's Focus**: Body part matches your plan for today
- **Battle-tested**: Creator completed 10+ times
- **Trending**: Popular this week in network
- **Your Favorite**: You've starred or done 3+ times

---

## Multi-Body-Part Workouts

Workouts like "Chest + Legs" need handling:

### Solution: Primary Tag + Secondary Tags

Every workout has ONE primary body part, plus secondary tags:

```
Workout: "Deb's Chest and Legs"
Primary: Chest
Tags: +Legs, 45min, Strength
```

- Shows in Chest tab with "+Legs" badge
- User knows it includes legs without duplication
- Creator picks primary when creating workout

---

## Preview System

Users need to preview workouts without full navigation.

### Recommended: Long-Press Peek

- Hold finger on card → card lifts and expands
- Shows exercise tree preview
- Release → snaps back to original position
- Modern, fluid, zero navigation required

### Alternative: Swipe-Up Mini Sheet

- Swipe up on card → bottom sheet appears
- Shows workout details and actions
- Swipe down to dismiss

---

## App Structure Overview

```
HOME
├── Today's scheduled workout (plan-aware)
├── Quick start options
└── Notifications preview

MY WORKOUTS
├── My Plan (day-based, your schedule)
│   └── Mon | Tue | Wed | Thu | Fri | Sat | Sun
└── Shared With Me (body-part tabs)
    └── Chest | Arms | Back | Shoulders | Legs

SOCIAL
├── Activity feed (chronological)
├── Friend shares and completions
├── Messages and comments
└── Navigation bridge to library

PLANS
├── Active plan management
├── Shared plans from trainers
└── Plan templates
```

---

## Future Considerations

### Compound Body Part Categories

As usage grows, may need additional categories:

- Upper Body (Chest + Back + Arms)
- Lower Body (Legs + Glutes)
- Push (Chest + Shoulders + Triceps)
- Pull (Back + Biceps)
- Full Body
- Cardio / HIIT
- Sport-Specific

### Plan Sharing

Trainers and friends may share full plans, not just workouts:

```
Plan (12-week program)
└── Week Template (Mon-Sun pattern)
    └── Day Slot (Chest, Arms, etc.)
        └── Workout (the actual exercises)
```

Sharing at every level:
- Share a single workout
- Share a full multi-week plan

### Tag Mapping System

For plans with abstract slot types (Push/Pull/Legs, Upper/Lower):

```
Plan Slot: "Upper Push"
Matches Tags: Chest, Shoulders, Triceps

Plan Slot: "Lower Body"
Matches Tags: Legs, Glutes, Quads, Hamstrings
```

Shared workouts auto-place based on tag matching to plan slots.

---

## Design Principles

1. **Sharing is core**: Every feature supports workout sharing
2. **Universal organization**: Body parts, not days
3. **Urgency handled**: Social feed is chronological, permanent
4. **Zero friction discovery**: Top picks, smart ranking
5. **Preview without navigation**: Long-press peek
6. **Bridge systems**: Social links to Library seamlessly
7. **SSS Philosophy**: Super Stupid Simple - system does the work

---

## Document History

- **2025-01-01**: Initial architecture discussion and documentation
