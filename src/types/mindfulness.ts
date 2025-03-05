
export interface MindfulnessProgram {
  id: string;
  day_number: number;
  theme: string;
  scripture: string;
  practice: string;
  reflection_prompt: string;
  category: 'faith_based' | 'spiritual' | 'neutral' | 'centering-prayer';
  duration_minutes: number;
  focus_phrase?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserMindfulnessProgress {
  id: string;
  user_id: string;
  current_day: number;
  selected_category: 'faith_based' | 'spiritual' | 'neutral' | 'centering-prayer';
  last_completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MindfulnessReflection {
  id: string;
  user_id: string;
  program_day_id: string;
  reflection_content: string;
  created_at?: string;
  updated_at?: string;
}
