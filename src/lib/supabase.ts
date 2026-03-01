import { supabase } from '@/integrations/supabase/client';

export { supabase };

export type StoryHistory = {
  id: string;
  user_id: string;
  prompt: string;
  content: string;
  created_at: string;
};