# State Components

Reusable components for common UI states.

## Components

### LoadingState

Displays loading spinner with optional message.

```typescript
import {LoadingState} from '@/components';

// Basic usage
<LoadingState />

// With message
<LoadingState message="Loading workouts..." />

// Full screen
<LoadingState fullScreen />

// Custom size and color
<LoadingState size="small" color="#00FF00" />
```

**Props:**
- `message?: string` - Optional loading message
- `size?: 'small' | 'large'` - Spinner size (default: 'large')
- `color?: string` - Spinner color (default: theme.colors.actionSuccess)
- `fullScreen?: boolean` - Take up full screen (default: false)

---

### ErrorState

Displays error message with optional retry button.

```typescript
import {ErrorState} from '@/components';

// Basic usage
<ErrorState message="Failed to load data" />

// With retry
<ErrorState
  message="Failed to load workouts"
  onRetry={refetchWorkouts}
  retryText="Try Again"
/>

// Full screen
<ErrorState fullScreen />
```

**Props:**
- `message?: string` - Error message (default: "Something went wrong")
- `onRetry?: () => void` - Retry callback
- `retryText?: string` - Retry button text (default: "Try Again")
- `fullScreen?: boolean` - Take up full screen (default: false)

---

### EmptyState

Displays empty state when no data is available.

```typescript
import {EmptyState} from '@/components';

// Basic usage
<EmptyState message="No workouts found" />

// With title and action
<EmptyState
  title="No Workouts"
  message="You haven't created any workouts yet"
  actionText="Create Workout"
  onAction={navigateToCreate}
/>

// Full screen
<EmptyState fullScreen />
```

**Props:**
- `title?: string` - Optional title
- `message: string` - Empty state message (required)
- `actionText?: string` - CTA button text
- `onAction?: () => void` - CTA callback
- `fullScreen?: boolean` - Take up full screen (default: false)

## Usage Patterns

### Async Data Fetching

```typescript
const WorkoutList = () => {
  const {data, isLoading, isError, refetch} = useWorkouts();

  if (isLoading) {
    return <LoadingState message="Loading workouts..." fullScreen />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load workouts"
        onRetry={refetch}
        fullScreen
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Workouts"
        message="You haven't created any workouts yet"
        actionText="Create Workout"
        onAction={() => navigation.navigate('CreateWorkout')}
        fullScreen
      />
    );
  }

  return <FlatList data={data} />;
};
```

### Inline States

```typescript
const ProfileSection = () => {
  const {user, isLoading} = useUser();

  return (
    <View>
      <Header />
      {isLoading ? (
        <LoadingState message="Loading profile..." />
      ) : (
        <UserProfile user={user} />
      )}
    </View>
  );
};
```

## Design

All components use design tokens for consistent styling:
- Colors from `theme.colors`
- Spacing from `theme.spacing`
- Typography from `theme.typography`
- Button styles from `theme.buttons`

## Performance

All components are memoized with `React.memo` for optimal performance.
