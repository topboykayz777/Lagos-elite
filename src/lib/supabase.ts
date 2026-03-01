import { createClient } from '@supabase/supabase-js';

// These are automatically provided by the Dyad Supabase integration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing. Please ensure the integration is complete.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type StoryHistory = {
  id: string;
  user_id: string;
  prompt: string;
  content: string;
  created_at: string;
};