# Navigation System

Complete navigation infrastructure for Lift 3-2-1 with type-safe utilities, guards, and transitions.

## Overview

The navigation system provides:
- **Type-Safe Navigation**: Autocomplete and type checking for all routes
- **Separate Stacks**: Auth and Main navigators for clean separation
- **Navigation Hooks**: Typed hooks for easy navigation
- **Navigation Service**: Imperative navigation from anywhere
- **Auth Guards**: Protect routes based on authentication
- **Custom Transitions**: Reusable transition presets

## Architecture

```
App.tsx
├── AuthNavigator (when not authenticated)
│   ├── LoginScreen
│   ├── LoginFormScreen
│   ├── SignUpScreen
│   ├── SignUpStep2Screen
│   └── WelcomeScreen
└── MainNavigator (when authenticated)
    ├── HomePage
    └── [Future screens...]
```

## Usage

### Basic Navigation in Components

```typescript
import {useTypedNavigation} from '@/navigation';

const MyScreen = () => {
  const navigation = useTypedNavigation();

  const handlePress = () => {
    // Navigate to HomePage
    navigation.navigate('HomePage');

    // Navigate with params
    navigation.navigate('WorkoutSession', {workoutId: '123'});

    // Go back
    navigation.goBack();
  };

  return <Button onPress={handlePress} title="Navigate" />;
};
```

### Getting Route Params

```typescript
import {useTypedRoute} from '@/navigation';

const WorkoutSession = () => {
  const route = useTypedRoute<'WorkoutSession'>();
  const {workoutId} = route.params; // Fully typed!

  return <Text>Workout ID: {workoutId}</Text>;
};
```

### Using Navigation Actions

```typescript
import {useNavigationActions} from '@/navigation';

const MyScreen = () => {
  const {goBack, goToHome, reset, replace} = useNavigationActions();

  return (
    <View>
      <Button onPress={goBack} title="Go Back" />
      <Button onPress={goToHome} title="Go Home" />
      <Button onPress={() => reset('LoginScreen')} title="Logout" />
      <Button onPress={() => replace('HomePage')} title="Replace" />
    </View>
  );
};
```

### Safe Navigation with Param Validation

```typescript
import {useSafeNavigate} from '@/navigation';

const MyScreen = () => {
  const navigate = useSafeNavigate();

  const handlePress = () => {
    // TypeScript enforces params when required
    navigate('HomePage'); // OK - no params needed
    navigate('WorkoutSession', {workoutId: '123'}); // OK - params provided
    navigate('WorkoutSession'); // ERROR - params required!
  };

  return <Button onPress={handlePress} title="Navigate" />;
};
```

## Imperative Navigation

Navigate from services, utilities, or anywhere outside React components:

```typescript
import {navigationService} from '@/navigation';

// In a service file
export const handleLogout = async () => {
  await clearUserData();
  navigationService.reset('LoginScreen');
};

// In an error handler
export const handleUnauthorized = () => {
  navigationService.navigate('LoginScreen');
};

// Check current route
const currentRoute = navigationService.getCurrentRoute();
if (currentRoute === 'HomePage') {
  // Do something
}
```

## Navigation Guards

### Auth Guard (Protect Authenticated Screens)

```typescript
import {useAuthGuard} from '@/navigation';
import {ActivityIndicator} from 'react-native';

const ProtectedScreen = () => {
  const {isAllowed, isLoading} = useAuthGuard();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAllowed) {
    return null; // Will redirect to LoginScreen
  }

  return <View>{/* Protected content */}</View>;
};
```

### Guest Guard (Redirect If Already Authenticated)

```typescript
import {useGuestGuard} from '@/navigation';

const LoginScreen = () => {
  const {isAllowed, isLoading} = useGuestGuard();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAllowed) {
    return null; // Will redirect to HomePage
  }

  return <View>{/* Login form */}</View>;
};
```

### Higher-Order Guard Function

```typescript
import {withAuthGuard} from '@/navigation';

const handleProtectedAction = withAuthGuard(async () => {
  // This only runs if user is authenticated
  await performSensitiveOperation();
  navigation.navigate('ProtectedScreen');
});
```

### Imperative Auth Check

```typescript
import {requireAuth} from '@/navigation';

export const fetchUserData = async () => {
  // Check auth before proceeding
  const isAuth = await requireAuth();
  if (!isAuth) return; // User redirected to login

  // Proceed with authenticated request
  return await supabase.from('users').select();
};
```

## Custom Transitions

### Using Transition Presets

```typescript
import {
  defaultTransition,
  modalTransition,
  fadeTransition,
  noGestureOptions,
} from '@/navigation';

const Stack = createNativeStackNavigator();

<Stack.Navigator screenOptions={defaultTransition}>
  <Stack.Screen name="Home" component={Home} />
  <Stack.Screen
    name="Modal"
    component={Modal}
    options={modalTransition}
  />
  <Stack.Screen
    name="Fade"
    component={Fade}
    options={fadeTransition}
  />
  <Stack.Screen
    name="Terminal"
    component={Terminal}
    options={noGestureOptions}
  />
</Stack.Navigator>
```

### Available Transitions

- **defaultTransition**: Slide from right (standard navigation)
- **modalTransition**: Slide from bottom (modals)
- **fadeTransition**: Fade in/out (subtle)
- **fadeFromBottomTransition**: Fade + slide from bottom
- **noTransition**: Instant (no animation)
- **iosModalTransition**: iOS-style modal
- **simplePushTransition**: Simple slide
- **fullScreenModalOptions**: Full screen modal
- **transparentModalOptions**: Transparent overlay

### Creating Custom Transitions

```typescript
import {createCustomTransition, mergeTransitions} from '@/navigation';

// Custom fade with duration
const slowFade = createCustomTransition('fade', 500);

// Merge multiple configs
const customModal = mergeTransitions(modalTransition, {
  presentation: 'fullScreenModal',
});
```

## Type Definitions

### Route Params

```typescript
// src/navigation/types.ts
export type AuthStackParamList = {
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  SignUpScreen: undefined;
  SignUpStep2Screen: undefined;
  WelcomeScreen: undefined;
};

export type MainStackParamList = {
  HomePage: undefined;
  WorkoutList: undefined;
  WorkoutSession: {workoutId: string};
  PlanList: undefined;
  PlanDetail: {planId: string};
  History: undefined;
  HistoryDetail: {sessionId: string};
};
```

### Screen Props

```typescript
import type {AuthStackScreenProps, MainStackScreenProps} from '@/navigation';

// Auth screen
const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = ({
  navigation,
}) => {
  // navigation is fully typed
};

// Main screen
const WorkoutSession: React.FC<MainStackScreenProps<'WorkoutSession'>> = ({
  navigation,
  route,
}) => {
  // route.params is {workoutId: string}
};
```

## Best Practices

### 1. Always Use Typed Hooks

```typescript
// ✅ Good
import {useTypedNavigation, useTypedRoute} from '@/navigation';

// ❌ Bad
import {useNavigation, useRoute} from '@react-navigation/native';
```

### 2. Use Navigation Actions for Common Operations

```typescript
// ✅ Good
const {goBack, goToHome} = useNavigationActions();
goBack();

// ❌ Bad
navigation.canGoBack() && navigation.goBack();
```

### 3. Use Guards for Protected Screens

```typescript
// ✅ Good
const ProtectedScreen = () => {
  const {isAllowed, isLoading} = useAuthGuard();
  // Handle loading and unauthorized states
};

// ❌ Bad
const ProtectedScreen = () => {
  // No auth check - security issue!
};
```

### 4. Use Navigation Service for Non-Component Navigation

```typescript
// ✅ Good
import {navigationService} from '@/navigation';
navigationService.navigate('HomePage');

// ❌ Bad
// Trying to use hooks outside components
```

### 5. Use Transition Presets for Consistency

```typescript
// ✅ Good
import {modalTransition} from '@/navigation';
<Stack.Screen options={modalTransition} />

// ❌ Bad
<Stack.Screen options={{animation: 'slide_from_bottom', gestureEnabled: true}} />
```

## Files

- **types.ts**: Route param type definitions
- **hooks.ts**: Typed navigation hooks
- **navigationService.ts**: Imperative navigation service
- **guards.ts**: Auth guard hooks and utilities
- **transitions.ts**: Custom transition presets
- **AuthNavigator.tsx**: Authentication stack
- **MainNavigator.tsx**: Main app stack
- **index.ts**: Barrel export for clean imports

## Future Enhancements

- Tab Navigator (when more main screens are added)
- Deep linking configuration
- Screen tracking/analytics
- Navigation history management
- State persistence
- Drawer navigator (if needed)
