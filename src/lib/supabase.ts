import { createClient } from '@supabase/supabase-js';

// Using the project-specific credentials directly to ensure connectivity
const supabaseUrl = "https://vilknsbrvakthefsgfwg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpbGtuc2JydmFrdGhlZnNnZndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODk1MTUsImV4cCI6MjA4NzQ2NTUxNX0.kCmNQ43Vcl0Im0yL8mawB5HqhTO63bKfT-RaaivWjvA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type StoryHistory = {
  id: string;
  user_id: string;
  prompt: string;
  content: string;
  created_at: string;
};