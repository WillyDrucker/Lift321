# Service Layer Documentation

This directory contains the service layer architecture for interacting with Supabase and handling data operations.

## Architecture Overview

```
src/services/
├── supabaseClient.ts     # Supabase client initialization
├── apiUtils.ts           # API utilities and error handling
├── BaseService.ts        # Generic CRUD service class
├── authService.ts        # Authentication service (example)
└── index.ts             # Barrel exports
```

## Core Concepts

### 1. API Response Format

All services return a consistent `ApiResult<T>` type:

```typescript
// Success response
{
  data: T,
  error: null,
  status: 'success'
}

// Error response
{
  data: null,
  error: {
    message: string,
    code?: string,
    details?: any
  },
  status: 'error'
}
```

### 2. Using Services in Components

```typescript
import {authService, isApiSuccess} from '@/services';

const handleLogin = async () => {
  const result = await authService.signIn({
    email: 'user@example.com',
    password: 'password123',
  });

  if (isApiSuccess(result)) {
    // Success - result.data contains user and session
    const {user, session} = result.data;
    console.log('Logged in:', user.email);
  } else {
    // Error - result.error contains error info
    console.error('Login failed:', result.error.message);
  }
};
```

### 3. Creating a Custom Service with BaseService

For simple CRUD operations, extend `BaseService`:

```typescript
import {BaseService} from '@/services';

// Define your data type
type Workout = {
  id?: string;
  name: string;
  exercises: string[];
  duration: number;
  created_at?: string;
};

// Create service class
class WorkoutService extends BaseService<Workout> {
  constructor() {
    super('workouts'); // Supabase table name
  }

  // Add custom methods if needed
  async getByUserId(userId: string) {
    return this.getByFilter({user_id: userId});
  }
}

export const workoutService = new WorkoutService();

// Usage
const result = await workoutService.getAll();
const workout = await workoutService.create({
  name: 'Chest Day',
  exercises: ['Bench Press', 'Push-ups'],
  duration: 45,
});
```

### 4. Creating a Custom Service (Advanced)

For complex logic, create a service from scratch:

```typescript
import {supabase} from './supabaseClient';
import {handleSupabaseQuery, createSuccessResponse} from './apiUtils';
import type {ApiResult} from '@/types';

class CustomService {
  async complexOperation(params: any): Promise<ApiResult<any>> {
    // Use handleSupabaseQuery for automatic error handling
    return handleSupabaseQuery(async () => {
      return supabase
        .from('table')
        .select('*')
        .eq('field', params.value);
    });
  }
}
```

## BaseService Available Methods

### Read Operations
- `getAll(options?)` - Get all records
- `getById(id)` - Get single record by ID
- `getByFilter(filter, options?)` - Get records matching filter
- `getSingleByFilter(filter)` - Get one record matching filter

### Create Operations
- `create(data)` - Create single record
- `createMany(data[])` - Create multiple records

### Update Operations
- `update(id, data)` - Update record by ID
- `updateByFilter(filter, data)` - Update records matching filter

### Delete Operations
- `delete(id)` - Delete record by ID
- `deleteByFilter(filter)` - Delete records matching filter

### Count Operations
- `count(filter?)` - Count records (optionally filtered)

## Query Options

```typescript
type QueryOptions = {
  orderBy?: string;      // Column to order by (default: 'created_at')
  ascending?: boolean;   // Sort direction (default: false)
  limit?: number;        // Max results
  offset?: number;       // Skip N results
};

// Example
const result = await service.getAll({
  orderBy: 'name',
  ascending: true,
  limit: 10,
  offset: 0,
});
```

## Error Handling

### Using Type Guards

```typescript
import {isApiSuccess, isApiError} from '@/types';

const result = await service.getData();

if (isApiSuccess(result)) {
  // TypeScript knows result.data exists
  console.log(result.data);
} else if (isApiError(result)) {
  // TypeScript knows result.error exists
  console.error(result.error.message);
}
```

### Getting Error Messages

```typescript
import {getErrorMessage} from '@/services';

const result = await service.getData();
if (isApiError(result)) {
  const message = getErrorMessage(result);
  alert(message);
}
```

### Checking Error Codes

```typescript
import {isErrorCode} from '@/services';
import {ApiErrorCode} from '@/types';

const result = await authService.signIn(credentials);
if (isApiError(result)) {
  if (isErrorCode(result, ApiErrorCode.INVALID_CREDENTIALS)) {
    // Handle invalid credentials specifically
  }
}
```

## Validation

Use `validateRequiredFields` to validate data:

```typescript
import {validateRequiredFields} from '@/services';

const data = {name: 'Workout', duration: 30};
const error = validateRequiredFields(data, ['name', 'duration', 'exercises']);

if (error) {
  // Error contains missing field info
  console.error(error.error.message);
  return error;
}
```

## Retry Logic

For operations that might fail due to network issues:

```typescript
import {retry} from '@/services';

const result = await retry(
  () => service.getData(),
  {
    maxAttempts: 3,
    delay: 1000,      // 1 second
    backoff: 2,       // Exponential backoff multiplier
  }
);
```

## Environment Setup

Add these to your `.env` file:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Best Practices

1. **Always use ApiResult** - Return `ApiResult<T>` from service methods
2. **Use type guards** - Check responses with `isApiSuccess()` / `isApiError()`
3. **Export singletons** - Create one instance per service: `export const myService = new MyService()`
4. **Validate inputs** - Use `validateRequiredFields()` before making API calls
5. **Handle errors** - Always check for errors before using data
6. **Use BaseService** - Extend it for simple CRUD operations
7. **Type your data** - Define TypeScript types for all database models
