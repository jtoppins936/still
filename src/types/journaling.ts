
export interface JournalingPromptType {
  id: string;
  day_number: number;
  title: string;
  prompt_text: string;
  supporting_text?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserJournalingProgress {
  id: string;
  user_id: string;
  current_day: number;
  last_completed_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  entry_type: string;
  content: string;
  prompt_id?: string;
  created_at?: string;
  updated_at?: string;
}
