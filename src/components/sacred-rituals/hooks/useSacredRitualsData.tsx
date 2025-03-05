
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export interface SacredRitualActivity {
  id: string;
  category: string;
  title: string;
  description: string;
  duration_minutes: number;
  created_at: string | null;
  day: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  activity_id: string;
  scheduled_for: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useSacredRitualsData = () => {
  const { session } = useAuth();

  // Fetch program data
  const programQuery = useQuery({
    queryKey: ["sacred-rituals-program"],
    queryFn: async (): Promise<SacredRitualActivity[]> => {
      const { data, error } = await supabase
        .from("reflective_activities")
        .select("*")
        .eq("category", "sacred_rituals")
        .order("day");

      if (error) throw error;
      return data as SacredRitualActivity[];
    },
  });

  // Fetch user progress with proper typing
  const progressQuery = useQuery({
    queryKey: ["sacred-rituals-progress", session?.user?.id],
    queryFn: async (): Promise<UserProgress | null> => {
      if (!session?.user?.id) return null;

      const { data: activities } = await supabase
        .from("reflective_activities")
        .select("id")
        .eq("category", "sacred_rituals")
        .eq("day", 1)
        .limit(1);
        
      if (!activities || activities.length === 0) return null;

      const { data: existingProgress, error } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("activity_id", activities[0].id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      
      return existingProgress as UserProgress | null;
    },
    enabled: !!session?.user?.id,
  });

  return {
    programData: programQuery.data,
    userProgress: progressQuery.data,
    isLoading: programQuery.isLoading || progressQuery.isLoading,
    refetchProgress: progressQuery.refetch,
  };
};
