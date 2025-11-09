// ==========================================================================
// GLOBAL TYPE DECLARATIONS
//
// App-wide TypeScript types and interfaces.
// Auto-imported by TypeScript (no explicit import needed).
//
// Dependencies: None (global declarations)
// Used by: All TypeScript files automatically
// ==========================================================================

// === IMAGE IMPORTS ===
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

// === ENVIRONMENT VARIABLES ===
declare module '@env' {
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
}

// === GLOBAL TYPE AUGMENTATIONS ===
declare global {
  // React Navigation type safety
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// This export makes it a module
export {};
