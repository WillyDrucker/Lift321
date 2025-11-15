# ErrorBoundary

React error boundary component for crash protection.

## Purpose

Catches JavaScript errors anywhere in the component tree and displays fallback UI instead of crashing the app.

## Usage

### Basic Usage

Wrap your app or specific components:

```typescript
import {ErrorBoundary} from '@/components';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Custom Fallback

Provide a custom fallback UI:

```typescript
<ErrorBoundary
  fallback={(error, resetError) => (
    <View>
      <Text>Custom error: {error.message}</Text>
      <Button onPress={resetError} title="Reset" />
    </View>
  )}
>
  <MyComponent />
</ErrorBoundary>
```

## Features

- **Automatic Error Catching**: Catches errors in child components
- **Fallback UI**: Displays user-friendly error message
- **Dev Mode Details**: Shows error details in development
- **Reset Functionality**: Try again button to reset error state
- **Logging**: Logs errors to console for debugging

## Default Fallback UI

- Error title: "Something went wrong"
- User-friendly message
- Error details (dev mode only)
- "Try Again" button to reset

## Best Practices

1. **Wrap at App Level**: Protect entire app from crashes
2. **Use Multiple Boundaries**: Isolate errors to specific features
3. **Custom Fallbacks**: Provide context-specific error messages
4. **Error Logging**: Log errors to monitoring service in production

## Example

```typescript
// App.tsx
import {ErrorBoundary} from '@/components';

const App = () => {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};
```
