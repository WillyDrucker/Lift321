// ==========================================================================
// SUPABASE CLIENT
//
// Initializes Supabase client for React Native.
// Configured with AsyncStorage for session persistence.
//
// IMPORTANT: This connects to a brand new Supabase project for Lift 3-2-1.
// Create new project at https://supabase.com and update .env file.
//
// Dependencies: @supabase/supabase-js, AsyncStorage, environment variables
// Used by: All services that interact with Supabase
// ==========================================================================

import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';
import type {Database} from './database.types';

// Type-safe Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // React Native doesn't use URLs for auth
  },
});
