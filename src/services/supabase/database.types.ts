// ==========================================================================
// SUPABASE DATABASE TYPES
//
// TypeScript types generated from Supabase database schema.
//
// SETUP INSTRUCTIONS:
// 1. Create your Supabase project at https://supabase.com
// 2. Design your database schema (tables for users, workouts, plans, etc.)
// 3. Generate types with: npx supabase gen types typescript --project-id "your-project-id" > src/services/supabase/database.types.ts
//
// This is a placeholder - replace with actual generated types after creating your database.
//
// Dependencies: Supabase project schema
// Used by: Supabase client, all service files
// ==========================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Placeholder - will be replaced with actual schema
      // Example structure:
      // workouts: {
      //   Row: { id: string; user_id: string; name: string; created_at: string }
      //   Insert: { id?: string; user_id: string; name: string; created_at?: string }
      //   Update: { id?: string; user_id?: string; name?: string; created_at?: string }
      // }
    };
  };
}
