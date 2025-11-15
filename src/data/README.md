# Data Layer

Static JSON data for exercises and training plans.

## Files

- `exercises.json` - 168 exercise variations
- `plans.json` - 11 training plans
- `index.ts` - Typed data exports and utility functions

## Usage

### Import Exercises

```typescript
import {
  exercises,
  findExerciseByName,
  getExercisesByBodyPart,
  groupExercisesByDay,
  getBodyParts,
} from '@/data';

// Get all exercises
const allExercises = exercises; // Exercise[] - 168 items

// Find specific exercise
const benchPress = findExerciseByName('Bench Press'); // Exercise[]

// Get exercises by body part
const chestExercises = getExercisesByBodyPart('Chest'); // Exercise[]

// Group exercises by day
const exercisesByDay = groupExercisesByDay(); // { Monday: Exercise[], Tuesday: Exercise[], ... }

// Get unique body parts
const bodyParts = getBodyParts(); // string[]
```

### Import Plans

```typescript
import {
  plans,
  findPlanByAbbreviation,
  findPlanByName,
  filterPlansByDuration,
} from '@/data';

// Get all plans
const allPlans = plans; // Plan[] - 11 items

// Find specific plan
const lift321 = findPlanByAbbreviation('3-2-1'); // Plan | undefined
const beginnerPlan = findPlanByName('Beginner'); // Plan | undefined

// Filter by duration
const shortPlans = filterPlansByDuration(undefined, 8); // Plans <= 8 weeks
const longPlans = filterPlansByDuration(12); // Plans >= 12 weeks
```

### Filter Exercises

```typescript
import {filterExercises} from '@/data';

// Find free weight chest exercises
const freeWeightChest = filterExercises({
  bodyPart: 'Chest',
  equipmentWeight: 'Free Weight',
});

// Find Monday push exercises
const mondayPush = filterExercises({
  day: 'Monday',
  pushPull: 'Push',
});
```

## Data Structure

### Exercise

```typescript
{
  day: "Monday",
  body_part: "Chest",
  push_pull: "Push",
  muscle_group: "Major1",
  sets: "3",
  exercise_name: "Bench Press",
  position: "Flat",
  equipment_use: "Barbell",
  equipment_setup: "Olympic Flat Bench",
  equipment_weight: "Free Weight",
  program_order: "order1",
  program_color_code: "cc1",
  program1_order: "p1order4",
  program1_color_code: "p1cc3"
}
```

### Plan

```typescript
{
  plan_name: "Lift 3-2-1",
  total_duration: 15,
  abbreviation: "3-2-1",
  plan_exercise_order: "plan_3-2-1_order",
  week1_reps: 10,
  week2_reps: 10,
  // ... up to week15_reps
  "week1-3": "Consistency Training",
  "week4-6": "Begin Strength Training",
  // ... phase descriptions
  "week1-3_ew": "Free Weight",
  "week4-6_ew": "Free Weight",
  // ... equipment weight for phases
  plan_information: "Detailed description..."
}
```

## TypeScript Types

Import types from `@/types`:

```typescript
import type {Exercise, ExerciseFilters} from '@/types/exercise.types';
import type {Plan, UserPlan} from '@/types/plan.types';
```
