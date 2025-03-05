
import { SacredRitualActivity } from "./hooks/useSacredRitualsData";
import { UserProgress } from "./hooks/useSacredRitualsData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SaveReflectionProps {
  userId: string;
  programData: SacredRitualActivity[] | undefined;
  userProgress: UserProgress | null;
  reflection: string;
  currentDay: number;
  onSuccess: () => void;
}

export const useSaveReflection = () => {
  const { toast } = useToast();

  const saveReflection = async ({
    userId,
    programData,
    userProgress,
    reflection,
    currentDay,
    onSuccess,
  }: SaveReflectionProps) => {
    if (!userId || !programData || reflection.trim() === "") return;

    try {
      const activityId = programData.find(activity => activity.day === currentDay)?.id;
      
      if (!activityId) {
        toast({
          title: "Error",
          description: "Could not find the activity for the current day.",
          variant: "destructive",
        });
        return;
      }
      
      await supabase.from("journal_entries").insert({
        user_id: userId,
        content: reflection,
        entry_type: "sacred_rituals"
      });

      if (userProgress) {
        await supabase
          .from("user_activities")
          .update({
            scheduled_for: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
            completed: currentDay >= 30
          })
          .eq("id", userProgress.id);
      } else {
        await supabase.from("user_activities").insert({
          user_id: userId,
          activity_id: activityId,
          scheduled_for: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
          completed: currentDay >= 30
        });
      }

      toast({
        title: "Reflection submitted",
        description: "Your sacred ritual reflection has been saved.",
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error saving reflection:", error);
      toast({
        title: "Error",
        description: "Failed to save your reflection. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { saveReflection };
};
